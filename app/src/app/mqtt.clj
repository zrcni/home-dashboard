(ns app.mqtt
  (:require [app.config :refer [cfg]]
            [clojurewerkz.machine-head.client :as mh]
            [cheshire.core :as json]
            [clojure.java.io :as io]))

(def qos {:at-most-once 0
          :at-least-once 1
          :exactly-once 2})

(def *conn (atom nil))

(defn connect! []
  (when-not @*conn
    ;; TODO: handle connection errors and retries
    (reset! *conn (mh/connect (:mqtt-broker-url cfg)))))

(defn disconnect! []
  (when @*conn
    (mh/disconnect @*conn)
    (reset! *conn nil)))

(defn subscribe [topic callback]
  (mh/subscribe @*conn {topic (:at-least-once qos)}
                (fn [_ _ raw-payload]
                  (-> raw-payload
                      (io/reader)
                        ;; true = keys to keywords
                      (json/parse-stream true)
                      (callback)))))

(defn unsubscribe [topic]
  (mh/unsubscribe @*conn topic))

(defn publish [topic payload]
  (when @*conn
    (mh/publish @*conn topic (json/generate-string payload))))
