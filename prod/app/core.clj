(ns app.core
  (:require [app.renderer :as renderer]
            [app.mqtt :as mqtt]
            [app.repl :as repl]
            [app.config :refer [cfg]]
            [app.temperature-mode.mqtt :as temperature-mode-mqtt]
            [app.shutdown :as shutdown]
            [app.logger :as log]
            [app.events.core :refer [dispatch]]
            [app.events.api :refer [create-event]]
            [app.image-mode.core :as image-mode]
            [clojure.pprint :refer [pprint]])
  (:gen-class))

(defn -main [& _args]
  (log/info "Starting the app")
  (log/info (with-out-str (pprint cfg)))

  (shutdown/add-hook :mqtt/disconnect mqtt/disconnect!)
  (shutdown/add-hook :renderer/unmount renderer/unmount!)
  (shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)
  (shutdown/add-hook :repl/stop repl/stop!)

  (image-mode/on-refresh #(dispatch (create-event :image-mode-images-refreshed {:images %})))
  (dispatch :activate-mode-temperature)

  (repl/start!)
  (mqtt/connect!)
  (temperature-mode-mqtt/subscribe)
  (renderer/mount!))
