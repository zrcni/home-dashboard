(ns app.temperature-mode.core
  (:require [clojure.core.async :refer [put! chan go-loop <!]]))

(def *callbacks (atom #{}))

(def in-ch (chan))
(def out-ch (chan))

(defn subscribe [callback]
  (swap! *callbacks conj callback)
  (fn [] (swap! *callbacks disj callback)))

(defn on-msg [msg]
  (doseq [callback @*callbacks]
    (callback msg)))

(go-loop []
  (on-msg (<! in-ch))
  (recur))

(defn request-update []
  (put! out-ch true))
