(ns app.events.handlers
  (:import java.time.Instant)
  (:require [app.events.api :refer [create-event]]
            [app.utils :refer [date->relative]]
            [app.wolfenstein-mode.core :as wolfenstein-mode]))

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defn show-menu [_ *state _]
  (swap! *state assoc :menu? true))

(defn hide-menu [_ *state _]
  (swap! *state assoc :menu? false))

(defn enter-fullscreen [_ *state _]
  (swap! *state assoc :fullscreen? true))

(defn exit-fullscreen [_ *state _]
  (swap! *state assoc :fullscreen? false))

(defn activate-mode-static-image [_ *state dispatch]
  (when-not (= (:active-mode @*state) :static-image)
    (dispatch (create-event (make-deactivate-event-type (:active-mode @*state))))
    (swap! *state assoc :active-mode :static-image))
  (dispatch (create-event :hide-menu)))

(defn activate-mode-wolfenstein [_ *state dispatch]
  (when-not (= (:active-mode @*state) :wolfenstein)
    (dispatch (create-event (make-deactivate-event-type (:active-mode @*state))))
    (let [deactivate (wolfenstein-mode/activate #(dispatch (create-event :wolfenstein-image-updated {:img-n %})))]
      (swap! *state assoc-in [:modes :wolfenstein :deactivate-fn] deactivate))
    (swap! *state assoc :active-mode :wolfenstein))
  (dispatch (create-event :hide-menu)))

(defn deactivate-mode-wolfenstein [_ *state _]
  (when-let [deactivate (-> @*state :modes :wolfenstein :deactivate-fn)]
    (deactivate)
    (swap! *state assoc-in [:modes :wolfenstein :deactivate-fn] nil)))

(defn wolfenstein-image-updated [e *state _]
  (let [img-n (-> e :event/data :img-n)
        image (str "app/images/wolfenstein/" img-n ".png")]
    (swap! *state assoc-in [:modes :wolfenstein :image] image)))

(defn activate-mode-temperature [_ *state dispatch]
  (when-not (= (:active-mode @*state) :temperature)
    (dispatch (create-event (make-deactivate-event-type (:active-mode @*state))))
    (swap! *state assoc :active-mode :temperature))
  (dispatch (create-event :hide-menu)))

(defn temperature-updated [e *state _]
  (swap! *state assoc-in [:modes :temperature :data] (select-keys (:event/data e) [:temperature :humidity]))
  (swap! *state assoc-in [:modes :temperature :last-updated] (-> e :event/data :timestamp))
  ;; TODO: temporary
  (swap! *state assoc-in [:modes :temperature :last-updated-formatted] (date->relative (-> e :event/data :timestamp))))

;; TODO: temporary
(defn update-temperature-date-format [_ *state _]
  (let [last-updated (-> @*state :modes :temperature :last-updated)]
    (swap! *state assoc-in [:modes :temperature :last-updated-formatted] (date->relative last-updated))))

(defn update-time-now [_ *state _]
  (swap! *state assoc :time-now (Instant/now)))

(defn register [subscribe]
  (comp (subscribe :show-menu #'show-menu)
        (subscribe :hide-menu #'hide-menu)
        (subscribe :enter-fullscreen #'enter-fullscreen)
        (subscribe :exit-fullscreen #'exit-fullscreen)
        (subscribe :activate-mode-static-image #'activate-mode-static-image)
        (subscribe :activate-mode-wolfenstein #'activate-mode-wolfenstein)
        (subscribe :deactivate-mode-wolfenstein #'deactivate-mode-wolfenstein)
        (subscribe :wolfenstein-image-updated #'wolfenstein-image-updated)
        (subscribe :activate-mode-temperature #'activate-mode-temperature)
        (subscribe :temperature-updated #'temperature-updated)
        ;; TODO: temporary
        (subscribe :update-temperature-date-format #'update-temperature-date-format)
        ;; TODO: temporary
        (subscribe :update-time-now #'update-time-now)))
