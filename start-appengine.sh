#!/bin/bash
set -e

port=$1
if [ "$port" == "" ]; then
  port='8080'
fi

echo "Starting server on: http://localhost:"$port"/"

dev_appserver.py app.yaml --dev_appserver_log_level warning --port $port
