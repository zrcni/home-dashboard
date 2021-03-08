(ns app.conditions.mqtt
  (:require [clojure.core.async :refer [put!]]
            [app.conditions.core :refer [in-ch]]
            [app.mqtt :as mqtt]))

(def topic "home/livingroom/temperature")

(defn on-conditions-updated [data]
  (put! in-ch data))

(defn subscribe []
  (mqtt/subscribe topic #'on-conditions-updated))
