(ns app.temperature-mode.mqtt
  (:require [clojure.core.async :refer [put!]]
            [app.temperature-mode.core :refer [msg-ch]]
            [app.mqtt :as mqtt]))

(defn on-temperature-updated [data]
  (put! msg-ch data))

(mqtt/subscribe "/devices/rpi/events/temperature_updated"
                #'on-temperature-updated)
