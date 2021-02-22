(ns app.views.main.temperature
  (:require [app.events.api :refer [create-event]]
            [app.events.core :refer [dispatch]]
            [app.utils :refer [date->hhmm]]
            [clojure.core.async :refer [timeout go-loop <!]]))

(defn clock [{:keys [date]}]
  {:fx/type :v-box
   :style-class "temperature-mode-row"
   :alignment :center
   :children [{:fx/type :text
               :style-class ["temperature-mode-text" "clock-text"]
               :text (date->hhmm date)}]})

;; TODO: thermometer icon
(defn temperature [{:keys [temperature]}]
  {:fx/type :v-box
   :style-class "temperature-mode-row"
   :alignment :center
   :children [{:fx/type :text
               :style-class ["temperature-mode-text" "temperature-text"]
               :text (str temperature "°C")}
              {:fx/type :text
               :style-class ["temperature-mode-text" "temperature-mode-label"]
               :text "TEMPERATURE"}]})

;; TODO: water drop icon?
(defn humidity [{:keys [humidity]}]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type :text
               :style-class ["temperature-mode-text" "humidity-text"]
               :text (str humidity "%")}
              {:fx/type :text 
               :style-class ["temperature-mode-text" "temperature-mode-label"]
               :text "HUMIDITY"}]})

;; Temporary solution until I migrate to cljfx context.
;; TODO: temporary
(go-loop []
  (<! (timeout 1000))
  (dispatch (create-event :update-temperature-date-format))
  (dispatch (create-event :update-time-now))
  (recur))

(defn last-updated-date [{:keys [formatted-date]}]
  {:fx/type :text
   :style-class ["temperature-mode-text" "last-updated-text"]
   :text (str "Updated " formatted-date)})

;; TODO: clock icon
(defn last-updated [{:keys [date]}]
    {:fx/type :v-box
     :alignment :center
     :style-class "last-updated-row"
     :children [{:fx/type last-updated-date
                 :formatted-date date}]})

(defn no-temperature [_]
  {:fx/type :text
   :style-class ["temperature-mode-text" "temperature-mode-no-data-text"]
   :text "No temperature data currently :("})

(defn temperature-view [{:keys [mode time-now]}]
  {:fx/type :v-box
   :alignment :center
   :children (if (:data mode)
               [{:fx/type clock
                 :date time-now}
                {:fx/type temperature
                 :temperature (-> mode :data :temperature)}
                {:fx/type humidity
                 :humidity (-> mode :data :humidity)}
                {:fx/type last-updated
                 :date (-> mode :last-updated-formatted)}]

               [{:fx/type clock
                 :date time-now}
                {:fx/type no-temperature}])})
