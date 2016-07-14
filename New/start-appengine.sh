#!/bin/bash
set -e

echo "Starting server on: http://localhost:8080/"

dev_appserver.py gae/app.yaml --dev_appserver_log_level warning --port 8080
