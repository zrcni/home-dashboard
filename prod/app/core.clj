(ns app.core
  (:require [app.renderer :as renderer]
            [app.mqtt :as mqtt]
            [app.temperature-mode.mqtt :as temperature-mode-mqtt])
  (:gen-class))

(defn -main [& _args]
  (mqtt/connect)
  (temperature-mode-mqtt/subscribe)
  (renderer/mount))
