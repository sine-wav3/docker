#!/bin/bash
clear
echo "================================================================="
echo "        MONITOR DE RECURSOS EN VIVO DE UBUNTU (WSL)             "
echo "================================================================="

while true; do
    clear
    echo "=== FECHA Y HORA DE SISTEMA: $(date) ==="
    echo "-----------------------------------------------------------------"
    echo "➡️ RENDIMIENTO DE LA CPU HOST:"
    top -bn1 | grep "Cpu(s)" | awk '{print "   Modo Usuario: "$2"% | Modo Kernel: "$4"% | Inactivo (Idle): "$8"%"}'
    echo ""
    echo "➡️ ESTADO DE LOS CONTENEDORES DOCKER EN TIEMPO REAL:"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" node_express_stress postgres_stress_container
    echo ""
    echo "➡️ PROTOCOLO NETSTAT / SS (Sockets abiertos en Postgres):"
    CONNS=$(ss -ant | grep -c :5432)
    echo "   Conexiones activas en la interfaz del kernel hacia puerto 5432: $CONNS"
    echo "-----------------------------------------------------------------"
    echo " Detener monitor con [CTRL+C]"
    sleep 2
done
