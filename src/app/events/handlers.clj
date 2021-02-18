(ns app.events.handlers
  (:require [app.events.api :refer [create-event]]
            [app.wolfenstein-mode.core :as wolfenstein-mode]))

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defn show-menu [_ *state _]
  (swap! *state assoc :menu? true))

(defn hide-menu [_ *state _]
  (swap! *state assoc :menu? false))

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
  (swap! *state assoc-in [:modes :temperature :data] (:event/data e))
  (swap! *state assoc-in [:modes :temperature :last-updated] "TODO: add date"))

(defn register [subscribe]
  (subscribe :show-menu #'show-menu)
  (subscribe :hide-menu #'hide-menu)
  (subscribe :activate-mode-static-image #'activate-mode-static-image)
  (subscribe :activate-mode-wolfenstein #'activate-mode-wolfenstein)
  (subscribe :deactivate-mode-wolfenstein #'deactivate-mode-wolfenstein)
  (subscribe :wolfenstein-image-updated #'wolfenstein-image-updated)
  (subscribe :activate-mode-temperature #'activate-mode-temperature)
  (subscribe :temperature-updated #'temperature-updated))
