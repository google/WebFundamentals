#!/bin/bash
set -e

echo "Starting server on: http://localhost:8080/"

dev_appserver.py appengine_app.yaml --dev_appserver_log_level warning --port 8080
