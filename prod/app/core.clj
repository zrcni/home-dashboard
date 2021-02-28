(ns app.core
  (:require [app.renderer :as renderer]
            [app.mqtt :as mqtt]
            [app.repl :as repl]
            [app.temperature-mode.mqtt :as temperature-mode-mqtt]
            [app.shutdown :as shutdown]
            [app.logger :as log]
            [app.events.core :refer [dispatch]])
  (:gen-class))

(defn -main [& _args]
  (log/info "Starting the app")

  (shutdown/add-hook :mqtt/disconnect mqtt/disconnect!)
  (shutdown/add-hook :renderer/unmount renderer/unmount!)
  (shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)
  (shutdown/add-hook :repl/stop repl/stop!)

  (dispatch :activate-mode-temperature)

  (repl/start!)
  (mqtt/connect!)
  (temperature-mode-mqtt/subscribe)
  (renderer/mount!))
