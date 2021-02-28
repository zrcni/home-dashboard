(ns app.events.handlers
  (:require [app.cljfx-utils :refer [update-state!]]
            [app.utils :refer [date->relative]]))

;; TOOD: deactivate-mode-x -> deactivate-mode/x

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defmulti handle-event :event/type)

;; no-op for unhandled events
(defmethod handle-event :default [_])

(defmethod handle-event :menu/show [{:keys [fx/context]}]
  (update-state! context assoc :menu? true))

(defmethod handle-event :menu/hide [{:keys [fx/context]}]
  (update-state! context assoc :menu? false))

(defmethod handle-event :menu/toggle [{:keys [fx/context]}]
  (update-state! context update :menu? not))

(defmethod handle-event :fullscreen/enter [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? true))

(defmethod handle-event :fullscreen/exit [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? false))

(defmethod handle-event :activate-mode/gallery [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :gallery)
    (do (update-state! context assoc :active-mode :gallery)
        {:dispatch-n [(make-deactivate-event-type (:active-mode state))
                      :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :gallery/images-refreshed [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:gallery :images] (:images data)))

(defmethod handle-event :gallery/select-image [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:gallery :image] (:image data))
  (update-state! context assoc-in [:gallery :selecting?] false))

(defmethod handle-event :gallery/open-select [{:keys [fx/context]}]
  (update-state! context assoc-in [:gallery :selecting?] true)
  {:dispatch-n [:activate-mode/gallery]})

(defmethod handle-event :deactivate-mode-gallery [{:keys [fx/context state]}]
  (when (-> state :gallery :selecting?)
    (update-state! context assoc-in [:gallery :selecting?] false)))

(defmethod handle-event :set-deactivate-fn [{:keys [fx/context event/data]}]
  (let [{:keys [mode deactivate-fn]} data]
    (update-state! context assoc-in [mode :deactivate-fn] deactivate-fn)))

(defmethod handle-event :activate-mode-wolfenstein [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :wolfenstein)
    (do
      (update-state! context assoc :active-mode :wolfenstein)
      {:activate-mode-wolfenstein! nil
       :dispatch-n [(make-deactivate-event-type (:active-mode state))
                    :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :deactivate-mode-wolfenstein [{:keys [state]}]
  (when-let [deactivate (-> state :wolfenstein :deactivate-fn)]
    {:deactivate-mode-wolfenstein! deactivate}))

(defmethod handle-event :wolfenstein-image-updated [{:keys [fx/context event/data]}]
  (let [img-n (:img-n data)
        image (str "app/images/wolfenstein/" img-n ".png")]
    (update-state! context assoc-in [:wolfenstein :image] image)))

(defmethod handle-event :activate-mode/dashboard [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :dashboard)
    (do (update-state! context assoc :active-mode :dashboard)
        {:dispatch-n [(make-deactivate-event-type (:active-mode state))
                      :conditions/refresh-last-updated-relative
                      :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :conditions/updated [{:keys [fx/context event/data]}]
  (update-state! context assoc-in [:conditions :data] (select-keys data [:temperature :humidity]))
  (update-state! context assoc-in [:conditions :last-updated] (-> data :timestamp)))

(defmethod handle-event :conditions/refresh-last-updated-relative [{:keys [fx/context state]}]
  (when-let [last-updated (-> state :conditions :last-updated)]
    (update-state! context assoc-in [:conditions :last-updated-relative] (date->relative last-updated))))
