(ns app.wolfenstein.random)

(def *prev-img-n (atom nil))

(defn rand-excl [start end excl]
  (if (= 0 (- end start))
    start
    (let [n (+ start (rand-int (- end 1)))]
      (if-not (= n excl)
        n
        (apply rand-excl [start end excl])))))

;; invoke callback with 1-7 randomly
(defn update-image [callback]
  (let [img-n (rand-excl 1 7 @*prev-img-n)]
    (when-not (= @*prev-img-n img-n)
      (reset! *prev-img-n img-n)
      (callback img-n))))
