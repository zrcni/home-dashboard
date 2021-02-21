(ns app.views.main.temperature
  (:require [app.events.api :refer [create-event]]
            [app.events.core :refer [dispatch]]
            [clojure.core.async :refer [timeout go-loop <!]]))

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

;; Update date format in global state.
;; Temporary solution until I migrate to cljfx context.
;; TODO: temporary
(go-loop []
  (<! (timeout 1000))
  (dispatch (create-event :update-temperature-date-format))
  (recur))

(defn last-updated-date [{:keys [formatted-date]}]
  {:fx/type :text
   :style-class "temperature-mode-value"
   :text formatted-date})

;; TODO: clock icon
(defn last-updated [{:keys [date]}]
    {:fx/type :v-box
     :style-class "temperature-mode-row"
     :alignment :center
     :children [{:fx/type last-updated-date
                 :formatted-date date}
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
                 :date (-> mode :last-updated-formatted)}]

               [{:fx/type no-temperature}])})
