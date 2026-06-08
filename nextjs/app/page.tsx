"use client";

import { useState } from "react";
import { useEffect } from "react";
export default function Home() {

  const [logs, setLogs] = useState<string[]>([]);
  const [system, setSystem] = useState<any>(null);

  useEffect(() => {

  const interval = setInterval(async () => {

    const response = await fetch("/api/system");

    const data = await response.json();

    setSystem(data);

  }, 2000);

  return () => clearInterval(interval);

}, []);

  async function runTest(endpoint: string) {

    setLogs(prev => [
      ...prev,
      `Ejecutando ${endpoint}`
    ]);

    try {

      const response = await fetch(endpoint);

      const data = await response.json();

      setLogs(prev => [
        ...prev,
        JSON.stringify(data)
      ]);

    } catch (error) {

      setLogs(prev => [
        ...prev,
        "Error ejecutando prueba"
      ]);
    }
  }

  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Stress Dashboard
      </h1>

     <div className="mb-10">

      <h2 className="text-2xl mb-4">
       Sistema
      </h2>

      <pre>
       {JSON.stringify(system, null, 2)}
      </pre>

   </div>
 
      <div className="flex flex-col gap-3 max-w-sm">
  

        <button
          onClick={() => runTest("/api/stress/cpu")}
          className="border p-3 rounded"
        >
          CPU STRESS
        </button>

        <button
          onClick={() => runTest("/api/stress/db")}
          className="border p-3 rounded"
        >
          DB STRESS
        </button>

        <button
          onClick={() => runTest("/api/stress/web")}
          className="border p-3 rounded"
        >
          WEB STRESS
        </button>

        <button
          onClick={() => runTest("/api/stress/total")}
          className="border p-3 rounded"
        >
          STRESS TOTAL
        </button>

      </div>

      <div className="mt-10">

        <h2 className="text-2xl mb-4">
          Logs
        </h2>

        {logs.map((log, index) => (
          <div key={index}>
            {log}
          </div>
        ))}

      </div>

    </main>
  );
}
