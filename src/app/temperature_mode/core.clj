(ns app.temperature-mode.core
  (:require [app.logger :as log]
            [clojure.core.async :refer [chan go-loop <!]]))

(def *callbacks (atom #{}))

(def in-ch (chan))

(defn subscribe [callback]
  (swap! *callbacks conj callback)
  (fn [] (swap! *callbacks disj callback)))

(defn on-msg [msg]
  (doseq [callback @*callbacks]
    (try 
      (callback msg)
      (catch Exception err
        (log/error err)))))

(go-loop []
  (on-msg (<! in-ch))
  (recur))
