(ns app.events.handlers
  (:require [clojure.core.async :refer [put! chan]]
            [app.events.api :refer [create-event]]
            [app.wolfenstein-mode.core :as wolfenstein-mode]))

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defn show-menu [_ *state _]
  (swap! *state assoc :menu? true))

(defn hide-menu [_ *state _]
  (swap! *state assoc :menu? false))

(defn activate-mode-static-image [_ *state dispatch]
  (when-not (= (:active-mode @*state) :static-image)
    (let [prev-mode (:active-mode @*state)]
      (dispatch (create-event (make-deactivate-event-type prev-mode)))
      (swap! *state assoc :active-mode :static-image)))
  (dispatch (create-event :hide-menu)))

(defn activate-mode-wolfenstein [_ *state dispatch]
  (when-not (= (:active-mode @*state) :wolfenstein)
    (dispatch (create-event (make-deactivate-event-type (:active-mode @*state))))
    (let [kill-ch (wolfenstein-mode/activate #(dispatch (create-event :wolfenstein-image-updated {:img-n %})))]
      (swap! *state assoc-in [:modes :wolfenstein :stop] #(put! kill-ch true))
      (swap! *state assoc :active-mode :wolfenstein)))
  (dispatch (create-event :hide-menu)))

(defn deactivate-mode-wolfenstein [_ *state _]
  (when-let [stop (-> @*state :modes :wolfenstein :stop)]
    (stop)
    (wolfenstein-mode/deactivate)
    (swap! *state assoc-in [:modes :wolfenstein :stop] nil)))

(defn wolfenstein-image-updated [e *state _]
  (let [img-n (-> e :event/data :img-n)
        image (str "app/images/wolfenstein/" img-n ".png")]
    (swap! *state assoc-in [:modes :wolfenstein :image] image)))

(defn register [subscribe]
  (subscribe :show-menu show-menu)
  (subscribe :hide-menu hide-menu)
  (subscribe :activate-mode-static-image activate-mode-static-image)
  (subscribe :activate-mode-wolfenstein activate-mode-wolfenstein)
  (subscribe :deactivate-mode-wolfenstein deactivate-mode-wolfenstein)
  (subscribe :wolfenstein-image-updated wolfenstein-image-updated))
