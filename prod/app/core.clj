(ns app.core
  (:require [app.renderer :as renderer]
            [app.mqtt :as mqtt]
            [app.temperature-mode.mqtt :as temperature-mode-mqtt]
            [app.shutdown :as shutdown])
  (:gen-class))

(defn -main [& _args]
  (shutdown/add-hook :mqtt/disconnect mqtt/disconnect!)
  (shutdown/add-hook :renderer/unmount renderer/unmount!)
  (shutdown/add-hook :clojure.core/shutdown-agents shutdown-agents)

  (mqtt/connect!)
  (temperature-mode-mqtt/subscribe)
  (renderer/mount!))
