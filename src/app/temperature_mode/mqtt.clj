(ns app.temperature-mode.mqtt
  (:require [clojure.core.async :refer [put! <! go-loop]]
            [app.temperature-mode.core :refer [in-ch]]
            [app.mqtt :as mqtt]))

(defn on-temperature-updated [data]
  (put! in-ch data))

(mqtt/subscribe "/devices/rpi/events/temperature_updated"
                #'on-temperature-updated)

(defn get-temperature []
  (mqtt/publish "/devices/rpi/commands/temperature_get"))
