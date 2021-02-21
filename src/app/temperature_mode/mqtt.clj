(ns app.temperature-mode.mqtt
  (:require [clojure.core.async :refer [put!]]
            [app.temperature-mode.core :refer [in-ch]]
            [app.mqtt :as mqtt]))

(def topic "home/livingroom/temperature")

(defn on-temperature-updated [data]
  (put! in-ch data))

(defn subscribe []
  (mqtt/subscribe topic #'on-temperature-updated))
