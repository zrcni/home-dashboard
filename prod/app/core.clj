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
            [app.gallery.core :as gallery]
            [clojure.pprint :refer [pprint]])
  (:gen-class))

(defn -main [& _args]
  (log/info "Starting the app")
  (log/info (with-out-str (pprint cfg)))

  (shutdown/add-hook :mqtt/disconnect mqtt/disconnect!)
  (shutdown/add-hook :renderer/unmount renderer/unmount!)
  (shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)
  (shutdown/add-hook :repl/stop repl/stop!)

  ;; TODO: use same code in dev and prod
  (gallery/on-refresh #(dispatch (create-event :gallery/images-refreshed {:images %})))
  (dispatch :activate-mode-temperature)

  (repl/start!)
  (mqtt/connect!)
  (temperature-mode-mqtt/subscribe)
  (renderer/mount!))
