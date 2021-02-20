(ns app.prod
  (:require [app.core :as app]
            [app.mqtt :as mqtt]
            [app.temperature-mode.mqtt]))

(defn -main [& _args]
  (mqtt/connect)
  (app/start))
