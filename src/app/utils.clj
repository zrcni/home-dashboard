(ns app.utils
  (:require [clojure.core.async :refer [put! chan go-loop timeout <!]]))

(defn throttle-fn [f ms]
  (let [waiting? (atom false)
        c (chan 1)]
    (go-loop []
      (apply f (<! c))
      (<! (timeout ms))
      (reset! waiting? false)
      (recur))
    (fn [& args]
      (when-not @waiting?
        (reset! waiting? true)
        (put! c (or args []))))))
