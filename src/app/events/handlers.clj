(ns app.events.handlers
  (:require [app.cljfx-utils :refer [update-state!]]
            [app.utils :refer [date->relative]]))

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defmulti handle-event :event/type)

;; no-op for unhandled events
(defmethod handle-event :default [_])

(defmethod handle-event :show-menu [{:keys [fx/context]}]
  (update-state! context assoc :menu? true))

(defmethod handle-event :hide-menu [{:keys [fx/context]}]
  (update-state! context assoc :menu? false))

(defmethod handle-event :enter-fullscreen [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? true))

(defmethod handle-event :exit-fullscreen [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? false))

(defmethod handle-event :activate-mode-static-image [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :static-image)
    (do (update-state! context assoc :active-mode :static-image)
        {:dispatch-n [(make-deactivate-event-type (:active-mode state))
                      :hide-menu]})
    {:dispatch :hide-menu}))

(defmethod handle-event :image-mode-images-refreshed [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:modes :static-image :images] (:images data)))

(defmethod handle-event :image-mode-select-image [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:modes :static-image :image] (:image data))
  (update-state! context assoc-in [:modes :static-image :selecting?] false))

(defmethod handle-event :image-mode-open-select [{:keys [fx/context state]}]
  (when-not (-> state :modes :static-image :selecting?)
    (update-state! context assoc-in [:modes :static-image :selecting?] true)
    {:dispatch-n [:activate-mode-static-image]}))

(defmethod handle-event :deactivate-mode-static-image [{:keys [fx/context state]}]
  (when (-> state :modes :static-image :selecting?)
    (update-state! context assoc-in [:modes :static-image :selecting?] false)))

(defmethod handle-event :set-deactivate-fn [{:keys [fx/context event/data]}]
  (let [{:keys [mode deactivate-fn]} data]
    (update-state! context assoc-in [:modes mode :deactivate-fn] deactivate-fn)))

(defmethod handle-event :activate-mode-wolfenstein [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :wolfenstein)
    (do
      (update-state! context assoc :active-mode :wolfenstein)
      {:activate-mode-wolfenstein! nil
       :dispatch-n [(make-deactivate-event-type (:active-mode state))
                    :hide-menu]})
    {:dispatch :hide-menu}))

(defmethod handle-event :deactivate-mode-wolfenstein [{:keys [state]}]
  (when-let [deactivate (-> state :modes :wolfenstein :deactivate-fn)]
    {:deactivate-mode-wolfenstein! deactivate}))

(defmethod handle-event :wolfenstein-image-updated [{:keys [fx/context event/data]}]
  (let [img-n (:img-n data)
        image (str "app/images/wolfenstein/" img-n ".png")]
    (update-state! context assoc-in [:modes :wolfenstein :image] image)))

(defmethod handle-event :activate-mode-temperature [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :temperature)
    (do (update-state! context assoc :active-mode :temperature)
        {:dispatch-n [(make-deactivate-event-type (:active-mode state))
                      :refresh-temperature-last-updated-relative
                      :hide-menu]})
    {:dispatch :hide-menu}))

(defmethod handle-event :temperature-updated [{:keys [fx/context event/data]}]
  (update-state! context assoc-in [:modes :temperature :data] (select-keys data [:temperature :humidity]))
  (update-state! context assoc-in [:modes :temperature :last-updated] (-> data :timestamp)))

(defmethod handle-event :refresh-temperature-last-updated-relative [{:keys [fx/context state]}]
  (when-let [last-updated (-> state :modes :temperature :last-updated)]
    (update-state! context assoc-in [:modes :temperature :last-updated-relative] (date->relative last-updated))))
