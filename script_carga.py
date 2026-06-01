#!/usr/bin/env python3
"""
script_carga.py
Genera carga artificial de CPU y RAM para estresar el sistema operativo.
- Hilos en bucle infinito → saturan núcleos de CPU
- Lista creciente en memoria → consume RAM progresivamente
"""

import threading
import time
import os

# ── Configuración ──────────────────────────────────────────
CPU_THREADS = 4        # Número de hilos que saturan CPU
RAM_MB      = 512      # Megabytes de RAM a consumir
DURATION    = 60       # Segundos que dura la prueba
# ───────────────────────────────────────────────────────────

def consumir_cpu():
    """Bucle infinito que mantiene un núcleo al 100%."""
    fin = time.time() + DURATION
    while time.time() < fin:
        pass  # No hace nada útil, pero ocupa el núcleo

def consumir_ram(mb):
    """Reserva 'mb' megabytes llenándolos con datos."""
    datos = []
    chunk = b'X' * (1024 * 1024)  # 1 MB por bloque
    for _ in range(mb):
        datos.append(chunk)
    time.sleep(DURATION)           # Mantiene la memoria ocupada

if __name__ == "__main__":
    pid = os.getpid()
    print(f"[*] PID de este script: {pid}")
    print(f"[*] Lanzando {CPU_THREADS} hilos de CPU por {DURATION}s...")
    print(f"[*] Reservando {RAM_MB} MB de RAM...")

    # Hilos de CPU
    hilos = []
    for _ in range(CPU_THREADS):
        t = threading.Thread(target=consumir_cpu, daemon=True)
        t.start()
        hilos.append(t)

    # Hilo de RAM
    ram_thread = threading.Thread(
        target=consumir_ram, args=(RAM_MB,), daemon=True
    )
    ram_thread.start()

    # Esperar a que terminen
    for t in hilos:
        t.join()
    ram_thread.join()

    print("[*] Prueba finalizada.")
