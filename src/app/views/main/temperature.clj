(ns app.views.main.temperature
  (:require [app.utils :refer [format-date]]))

;; TODO: thermometer icon
(defn temperature [{:keys [temperature]}]
  {:fx/type :v-box
   :style-class "temperature-mode-row"
   :alignment :center
   :children [{:fx/type :text
               :style-class "temperature-mode-value"
               :text (str temperature "°C")}
              {:fx/type :text
               :style-class "temperature-mode-label"
               :text "TEMPERATURE"}]})

;; TODO: water drop icon?
(defn humidity [{:keys [humidity]}]
  {:fx/type :v-box
   :style-class "temperature-mode-row"
   :alignment :center
   :children [{:fx/type :text
               :style-class "temperature-mode-value"
               :text (str humidity "%")}
              {:fx/type :text 
               :style-class "temperature-mode-label"
               :text "HUMIDITY"}]})

(defn last-updated-date [{:keys [date]}]
  {:fx/type :text
   :style-class "temperature-mode-value"
   :text (format-date date)})

;; TODO: clock icon
(defn last-updated [{:keys [date]}]
    {:fx/type :v-box
     :style-class "temperature-mode-row"
     :alignment :center
     :children [{:fx/type last-updated-date
                 :date date}
                {:fx/type :text
                 :style-class "temperature-mode-label"
                 :text "LAST UPDATED"}]})

(defn no-temperature [_]
  {:fx/type :text
   :style-class ["temperature-mode-value" "temperature-mode-no-data-text"]
   :text "No temperature data currently :("})

(defn temperature-view [{:keys [mode]}]
  {:fx/type :v-box
   :alignment :center
   :children (if (:data mode)
               [{:fx/type temperature
                 :temperature (-> mode :data :temperature)}
                {:fx/type humidity
                 :humidity (-> mode :data :humidity)}
                {:fx/type last-updated
                 :date (-> mode :last-updated)}]

               [{:fx/type no-temperature}])})
