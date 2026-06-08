#!/bin/bash

clear

echo "====== CPU ======"
top -bn1 | grep "Cpu(s)"

echo
echo "====== MEMORIA ======"
free -h

echo
echo "====== DISCO ======"
df -h

echo
echo "====== POSTGRES ======"
docker exec postgres_db psql -U usuario -d stress_db -c "
SELECT count(*) FROM \"Metric\";
"

echo
echo "====== CONTENEDORES ======"
docker stats --no-stream
