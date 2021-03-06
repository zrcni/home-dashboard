(ns app.events.handlers
  (:require [app.cljfx-utils :refer [update-state!]]
            [app.utils :refer [date->relative]]
            [app.events.api :refer [create-event]]))

(defmulti handle-event :event/type)

;; no-op for unhandled events
(defmethod handle-event :default [_])

(defmethod handle-event :menu/show [{:keys [fx/context]}]
  (update-state! context assoc :menu? true))

(defmethod handle-event :menu/hide [{:keys [fx/context]}]
  (update-state! context assoc :menu? false))

(defmethod handle-event :menu/toggle [{:keys [fx/context]}]
  (update-state! context update :menu? not))

(defmethod handle-event :toolbar/toggle-visibility [{:keys [fx/context]}]
  (update-state! context update :toolbar-visible? not))

(defmethod handle-event :fullscreen/enter [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? true))

(defmethod handle-event :fullscreen/exit [{:keys [fx/context]}]
  (update-state! context assoc :fullscreen? false))

(defmethod handle-event :hide-view [{:keys [event/data]}]
  (case (:view data)
    :gallery {:dispatch :hide-view/gallery}
    :wolfenstein {:dispatch :hide-view/wolfenstein}
    nil))

(defmethod handle-event :show-view/gallery [{:keys [fx/context state]}]
  (if-not (= (:active-view state) :gallery)
    (do (update-state! context assoc :active-view :gallery)
        {:dispatch-n [(create-event :hide-view {:view (:active-view state)})
                      :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :gallery/images-refreshed [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:gallery :images] (:images data)))

(defmethod handle-event :gallery/select-image [{:keys [event/data fx/context]}]
  (update-state! context assoc-in [:gallery :image] (:image data))
  (update-state! context assoc-in [:gallery :selecting?] false))

(defmethod handle-event :gallery/open-select [{:keys [fx/context]}]
  (update-state! context assoc-in [:gallery :selecting?] true)
  {:dispatch-n [:show-view/gallery]})

(defmethod handle-event :gallery/close-select [{:keys [fx/context]}]
  (update-state! context assoc-in [:gallery :selecting?] false)
  {:dispatch-n [:show-view/gallery]})

(defmethod handle-event :hide-view/gallery [{:keys [fx/context state]}]
  (when (-> state :gallery :selecting?)
    (update-state! context assoc-in [:gallery :selecting?] false)))

(defmethod handle-event :show-view/wolfenstein [{:keys [fx/context state]}]
  (if-not (= (:active-view state) :wolfenstein)
    (do
      (update-state! context assoc :active-view :wolfenstein)
      {:wolfenstein/activate! nil
       :dispatch-n [(create-event :hide-view (:active-view state))
                    :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :hide-view/wolfenstein [{:keys [state]}]
  (when-let [deactivate-fn (-> state :wolfenstein :deactivate-fn)]
    {:wolfenstein/deactivate! deactivate-fn}))

(defmethod handle-event :wolfenstein/image-updated [{:keys [fx/context event/data]}]
  (let [img-n (:img-n data)
        image (str "images/wolfenstein/" img-n ".png")]
    (update-state! context assoc-in [:wolfenstein :image] image)))

(defmethod handle-event :wolfenstein/add-deactivate-fn [{:keys [fx/context event/data]}]
  (update-state! context assoc-in [:wolfenstein :deactivate-fn] (:deactivate-fn data)))

(defmethod handle-event :wolfenstein/remove-deactivate-fn [{:keys [fx/context]}]
  (update-state! context assoc-in [:wolfenstein :deactivate-fn] nil))

(defmethod handle-event :show-view/dashboard [{:keys [fx/context state]}]
  (if-not (= (:active-view state) :dashboard)
    (do (update-state! context assoc :active-view :dashboard)
        {:dispatch-n [(create-event :hide-view (:active-view state))
                      :conditions/refresh-last-updated-relative
                      :menu/hide]})
    {:dispatch :menu/hide}))

(defmethod handle-event :conditions/updated [{:keys [fx/context event/data]}]
  (update-state! context assoc-in [:conditions :data] (select-keys data [:temperature :humidity]))
  (update-state! context assoc-in [:conditions :last-updated] (-> data :timestamp)))

(defmethod handle-event :conditions/refresh-last-updated-relative [{:keys [fx/context state]}]
  (when-let [last-updated (-> state :conditions :last-updated)]
    (update-state! context assoc-in [:conditions :last-updated-relative] (date->relative last-updated))))
