#!/bin/bash

set -e

DEBUG=true \
MQTT_BROKER_URL=tcp://localhost:1884 \
DB_PATH=./db/home_dashboard.db \
  npm start
