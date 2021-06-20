#!/bin/bash

set -e

java -Duser.country=FI -Duser.language=en -cp home_dashboard_server.jar clojure.main -m server.core & echo $! > ~/.home_dashboard_server_pid
