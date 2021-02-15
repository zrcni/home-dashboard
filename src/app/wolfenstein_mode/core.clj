(ns app.wolfenstein-mode.core
  (:import java.time.LocalTime)
  (:require [clojure.core.async :refer [<! go alt! put! go-loop timeout chan close!]]))

(def *prev-image-n (atom nil))
(def *chan (atom nil))

(defn get-image-number [hour]
  (let [hour? #(= hour %)]
    (cond
      (some hour? [15 16]) 1
      (some hour? [13 14 17 18]) 2
      (some hour? [11 12 19 20]) 3
      (some hour? [9 10 21 22]) 4
      (some hour? [0 7 8 23]) 5
      (some hour? [1 2 5 6]) 6
      (some hour? [3 4]) 7
      :else (throw (.Exception (str "unexpected hour number: " hour))))))


(defn update-image-based-on-time [callback date]
  (let [img-n (get-image-number (.getHour date))]
    (when-not (= @*prev-image-n img-n)
      (reset! *prev-image-n img-n)
      (callback img-n))))

(defn activate [callback]
  (when-not @*chan
    (let [update-image #(update-image-based-on-time callback (LocalTime/now))]
      (update-image)

      (let [kill-ch (chan)
            loop-ch (go-loop []
                      (alt!
                        (timeout 1000) ([] (update-image) (recur))
                        kill-ch nil))]
        (reset! *chan loop-ch)
        kill-ch))))

(defn deactivate []
  (when @*chan
    (close! @*chan)
    (reset! *chan nil)))
