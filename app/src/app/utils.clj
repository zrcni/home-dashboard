(ns app.utils
  (:import org.ocpsoft.prettytime.PrettyTime
           org.ocpsoft.prettytime.units.JustNow
           org.ocpsoft.prettytime.units.Millisecond
           java.time.format.DateTimeFormatter
           java.time.ZoneId)
  (:require [clojure.core.async :refer [put! chan go-loop timeout <!]]
            [clojure.string :refer [capitalize]]))

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

(def pretty-time (PrettyTime.))
;; JustNow displays "moments ago" up to a minute AFAIK
;; and showing milliseconds is pointless
(.removeUnit pretty-time JustNow)
(.removeUnit pretty-time Millisecond)

(defn date->relative [date]
  (capitalize (.format pretty-time date)))

(defn date->hhmmss
  "Date to HH:mm:ss
   Implemented to be used with Instant, but probably works with other classes as well."
  [date]
  (-> "HH:mm:ss"
      (DateTimeFormatter/ofPattern)
      (.withZone (ZoneId/systemDefault))
      (.format date)))

(defn date->ddmmyyyy [date]
  (-> "E dd/M – 'week' w"
      (DateTimeFormatter/ofPattern)
      (.withZone (ZoneId/systemDefault))
      (.format date)))

(defn s->ms
  "seconds to milliseconds"
  [s]
  (* s 1000))
