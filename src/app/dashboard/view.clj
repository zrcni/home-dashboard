(ns app.dashboard.view
  (:import java.time.Instant)
  (:require [cljfx.api :as fx]
            [app.utils :refer [date->hhmmss]]
            [app.subs :as subs]
            [app.events.core :refer [dispatch]]
            [app.components.core :refer [create-view-with-overlay]]
            [clojure.core.async :refer [timeout close! go-loop <!]]))

(defn clock-text [_]
  {:fx/type fx/ext-on-instance-lifecycle
   :on-created (fn [c]
                 (.setText c (date->hhmmss (Instant/now)))
                 (let [ch (go-loop []
                            (<! (timeout 1000))
                            (.setText c (date->hhmmss (Instant/now)))
                            (recur))]
                   (.setUserData c {:ch ch})))
   :on-deleted #(close! (:ch (.getUserData %)))
   :desc {:fx/type :text
          :style-class ["dashboard-text" "clock-text"]}})

(defn clock [_]
  {:fx/type :v-box
   :style-class "dashboard-row"
   :alignment :center
   :children [{:fx/type clock-text}]})

;; TODO: thermometer icon
(defn temperature [{:keys [temperature]}]
  {:fx/type :v-box
   :style-class "dashboard-row"
   :alignment :center
   :children [{:fx/type :text
               :style-class ["dashboard-text" "dashboard-temperature-text"]
               :text (str temperature "°C")}
              {:fx/type :text
               :style-class ["dashboard-text" "dashboard-label"]
               :text "TEMPERATURE"}]})

;; TODO: water drop icon?
(defn humidity [{:keys [humidity]}]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type :text
               :style-class ["dashboard-text" "dashboard-humidity-text"]
               :text (str humidity "%")}
              {:fx/type :text
               :style-class ["dashboard-text" "dashboard-label"]
               :text "HUMIDITY"}]})

;; TODO: clock icon
(defn last-updated-text [{:keys [fx/context]}]
  (let [last-updated-relative (fx/sub-ctx context subs/conditions-last-updated-relative)]
    {:fx/type :text
     :style-class ["dashboard-text" "last-updated-text"]
     :text (str "Updated " last-updated-relative)}))

(defn last-updated [_]
  {:fx/type fx/ext-on-instance-lifecycle
   :on-created (fn [c]
                 (let [ch (go-loop []
                            (<! (timeout 1000))
                            (dispatch :conditions/refresh-last-updated-relative)
                            (recur))]
                   (-> c (.getProperties) (.put :ch ch))))
   :on-deleted (fn [c]
                 (-> c (.getProperties) (.get :ch) (close!)))
   :desc {:fx/type :v-box
          :alignment :center
          :style-class "last-updated-row"
          :children [{:fx/type last-updated-text}]}})

(defn create-conditions [conditions]
  [{:fx/type temperature
    :temperature (-> conditions :data :temperature)}
   {:fx/type humidity
    :humidity (-> conditions :data :humidity)}
   {:fx/type last-updated}])

(defn no-conditions [_]
  {:fx/type :text
   :style-class ["dashboard-text" "dashboard-no-data-text"]
   :text "No condition data currently :("})

(defn root [{:keys [fx/context]}]
  (let [conditions (fx/sub-ctx context subs/conditions)]
    (create-view-with-overlay
     {:fx/type :v-box
      :alignment :center
      :style-class "main-view"
      :children (if (:data conditions)
                  (cons {:fx/type clock} (create-conditions conditions))
                  [{:fx/type clock}
                   {:fx/type no-conditions}])})))
