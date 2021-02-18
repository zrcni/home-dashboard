(ns app.mqtt
  (:require [app.config :refer [cfg]]
            [clojurewerkz.machine-head.client :as mh]
            [cheshire.core :as json]
            [clojure.java [io :as io]]))

(def qos {:at-most-once 0
          :at-least-once 1
          :exactly-once 2})

(def *conn (atom nil))

(defn connect []
  (when-not @*conn 
    (reset! *conn (mh/connect (:mqtt-broker-addr cfg)))))

(defn disconnect []
  (when @*conn
    (mh/disconnect)
    (reset! *conn nil)))

(defn subscribe [topic callback]
  (when @*conn
    (mh/subscribe @*conn {topic (:at-least-once qos)}
                  (fn [_ _ raw-payload]
                    (-> raw-payload
                        (io/reader)
                        ;; true = keys to keywords
                        (json/parse-stream true)
                        (callback))))))

(defn unsubscribe [topic]
  (when @*conn
    (mh/unsubscribe @*conn topic)))

(defn publish [topic payload]
  (when @*conn
    (mh/publish @*conn topic (json/generate-string payload))))

(connect)
