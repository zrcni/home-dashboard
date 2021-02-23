(ns app.views.main.temperature
  (:import java.time.Instant)
  (:require [cljfx.api :as fx]
            [app.utils :refer [date->hhmm]]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]
            [app.events.core :refer [dispatch]]
            [clojure.core.async :refer [timeout close! go-loop <!]]))

(defn clock-text [_]
  {:fx/type fx/ext-on-instance-lifecycle
   :on-created (fn [c]
                 (.setText c (date->hhmm (Instant/now)))
                 (let [ch (go-loop []
                            (<! (timeout 1000))
                            (.setText c (date->hhmm (Instant/now)))
                            (recur))]
                   (.setUserData c {:ch ch})))
   :on-deleted #(close! (:ch (.getUserData %)))
   :desc {:fx/type :text
          :style-class ["temperature-mode-text" "clock-text"]}})

(defn clock [_]
  {:fx/type :v-box
   :style-class "temperature-mode-row"
   :alignment :center
   :children [{:fx/type clock-text}]})

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

;; TODO: clock icon
(defn last-updated-text [{:keys [fx/context]}]
  (let [last-updated-relative (fx/sub-ctx context subs/temperature-last-updated-relative)]
    {:fx/type :text
     :style-class ["temperature-mode-text" "last-updated-text"]
     :text (str "Updated " last-updated-relative)}))

(defn last-updated [_]
  {:fx/type fx/ext-on-instance-lifecycle
   :on-created (fn [c]
                 (let [ch (go-loop []
                            (<! (timeout 1000))
                            (dispatch (create-event :refresh-temperature-last-updated-relative))
                            (recur))]
                   (-> c (.getProperties) (.put :ch ch))))
   :on-deleted (fn [c]
                 (-> c (.getProperties) (.get :ch) (close!)))
   :desc {:fx/type :v-box
          :alignment :center
          :style-class "last-updated-row"
          :children [{:fx/type last-updated-text}]}})

(defn no-temperature [_]
  {:fx/type :text
   :style-class ["temperature-mode-text" "temperature-mode-no-data-text"]
   :text "No temperature data currently :("})

(defn temperature-view [{:keys [fx/context]}]
  (let [mode (fx/sub-ctx context subs/temperature-mode)]
    {:fx/type :v-box
     :alignment :center
     :children (if (:data mode)
                 [{:fx/type clock}
                  {:fx/type temperature
                   :temperature (-> mode :data :temperature)}
                  {:fx/type humidity
                   :humidity (-> mode :data :humidity)}
                  {:fx/type last-updated}]

                 [{:fx/type clock}
                  {:fx/type no-temperature}])}))
