(ns app.wolfenstein.time-based
  (:import java.time.LocalTime))

(def *prev-img-n (atom nil))

(defn get-image-number
  "Get an image number based on time.
   There are seven images in total."
  [hour]
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

;; invoke callback with 1-7 based on time
(defn update-image [callback]
  (let [img-n (get-image-number (.getHour (LocalTime/now)))]
    (when-not (= @*prev-img-n img-n)
      (reset! *prev-img-n img-n)
      (callback img-n))))
