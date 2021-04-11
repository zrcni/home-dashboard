#!/bin/bash

set -e

java -cp home_dashboard_server.jar clojure.main -m server.core & echo $! > ~/.home_dashboard_server_pid
