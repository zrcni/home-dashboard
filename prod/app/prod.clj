(ns app.prod
  (:require [app.core :as app]
            [app.mqtt :as mqtt]
            [app.temperature-mode.mqtt :as temperature-mode-mqtt]))

(defn -main [& _args]
  (mqtt/connect)
  (temperature-mode-mqtt/subscribe)
  (app/start))
