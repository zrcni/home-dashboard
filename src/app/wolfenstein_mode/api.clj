(ns app.wolfenstein-mode.api
  (:require [clojure.core.async :refer [alt! go-loop timeout chan close! put!]]))

(def *chan (atom nil))

(defn- deactivate []
  (when @*chan
    (close! @*chan)
    (reset! *chan nil)))

(defn create-activate [update-image interval-ms]
  (fn [callback]
    (when-not @*chan
      (update-image callback)

      (let [kill-ch (chan)
            loop-ch (go-loop []
                      (alt!
                        (timeout interval-ms)
                        ([] (update-image callback) (recur))
                        kill-ch nil))]
        (reset! *chan loop-ch)
        
        (fn []
          (put! kill-ch true)
          (deactivate))))))
