(ns app.wolfenstein-mode.core
  (:import java.time.LocalTime)
  (:require [clojure.core.async :refer [alt! go-loop timeout chan close!]]))

(def *rand? (atom true))
(def interval-ms (if @*rand? 2000 60000))

(def *prev-img-n (atom nil))
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

(defn rand-excl [start end excl]
  (if (= 0 (- end start))
    start
    (let [n (+ start (rand-int (- end 1)))]
      (if-not (= n excl)
        n
        (apply rand-excl [start end excl])))))

(defn update-image-based-on-time [callback]
  (let [img-n (get-image-number (.getHour (LocalTime/now)))]
    (when-not (= @*prev-img-n img-n)
      (reset! *prev-img-n img-n)
      (callback img-n))))

(defn update-image-randomly [callback]
  (let [img-n (rand-excl 1 7 @*prev-img-n)]
    (when-not (= @*prev-img-n img-n)
      (reset! *prev-img-n img-n)
      (callback img-n))))

(defn create-activate [update-image]
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
        kill-ch))))

(def activate (create-activate (if @*rand?
                                 update-image-randomly
                                 update-image-based-on-time)))

(defn deactivate []
  (when @*chan
    (close! @*chan)
    (reset! *chan nil)))
