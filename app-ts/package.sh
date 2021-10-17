#!/bin/bash

# Build the app for production environment.

set -e

MQTT_BROKER_URL=tcp://192.168.1.119:1883 \
  npm run package
