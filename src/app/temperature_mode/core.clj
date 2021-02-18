(ns app.temperature-mode.core
  (:require [clojure.core.async :refer [chan go-loop <!]]))

(def *callbacks (atom #{}))

(def msg-ch (chan))

(defn subscribe [callback]
  (swap! *callbacks conj callback)
  (fn [] (swap! *callbacks disj callback)))

(defn on-msg [msg]
  (doseq [callback @*callbacks]
    (callback msg)))

(go-loop []
  (on-msg (<! msg-ch))
  (recur))
