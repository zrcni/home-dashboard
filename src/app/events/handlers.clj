(ns app.events.handlers
  (:require [cljfx.api :as fx]
            [app.utils :refer [date->relative]]
            [app.events.api :refer [create-event]]))

(defn- make-deactivate-event-type [mode]
  (keyword (str "deactivate-mode-" (name mode))))

(defmulti handle-event :event/type)

;; (defmethod handle-event :default [e]
;;   (println e))

(defmethod handle-event :show-menu [{:keys [fx/context]}]
  {:context (fx/swap-context context assoc :menu? true)})

(defmethod handle-event :hide-menu [{:keys [fx/context]}]
  {:context (fx/swap-context context assoc :menu? false)})

(defmethod handle-event :enter-fullscreen [{:keys [fx/context]}]
  {:context (fx/swap-context context assoc :fullscreen? true)})

(defmethod handle-event :exit-fullscreen [{:keys [fx/context]}]
  {:context (fx/swap-context context assoc :fullscreen? false)})

(defmethod handle-event :activate-mode-static-image [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :static-image)
    {:context (fx/swap-context context assoc :active-mode :static-image)
     :dispatch-n [(create-event (make-deactivate-event-type (:active-mode state)))
                  (create-event :hide-menu)]}
    {:dispatch (create-event :hide-menu)}))

;; noop for now that the event is dispatched without any use for it
(defmethod handle-event :deactivate-mode-static-image [_])
(defmethod handle-event :deactivate-mode-temperature [_])

(defmethod handle-event :set-deactivate-fn [{:keys [fx/context event/data]}]
  (let [{:keys [mode deactivate-fn]} data]
    {:context (fx/swap-context context assoc-in [:modes mode :deactivate-fn] deactivate-fn)}))

(defmethod handle-event :activate-mode-wolfenstein [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :wolfenstein)
    {:activate-mode-wolfenstein! nil
     :dispatch-n [(create-event (make-deactivate-event-type (:active-mode state)))
                  (create-event :hide-menu)]
     :context (fx/swap-context context assoc :active-mode :wolfenstein)}
    {:dispatch (create-event :hide-menu)}))

(defmethod handle-event :deactivate-mode-wolfenstein [{:keys [fx/context]}]
  (when-let [deactivate (-> context :modes :wolfenstein :deactivate-fn)]
    {:deactivate-mode-wolfenstein! deactivate}))

(defmethod handle-event :wolfenstein-image-updated [{:keys [fx/context event/data]}]
  (let [img-n (:img-n data)
        image (str "app/images/wolfenstein/" img-n ".png")]
    {:context (fx/swap-context context assoc-in [:modes :wolfenstein :image] image)}))

(defmethod handle-event :activate-mode-temperature [{:keys [fx/context state]}]
  (if-not (= (:active-mode state) :temperature)
    {:dispatch-n [(create-event (make-deactivate-event-type (:active-mode state)))
                  (create-event :refresh-temperature-last-updated-relative)
                  (create-event :hide-menu)]
     :context (fx/swap-context context assoc :active-mode :temperature)}
    {:dispatch (create-event :hide-menu)}))

(defmethod handle-event :temperature-updated [{:keys [fx/context event/data]}]
  {:context (-> context
                (fx/swap-context assoc-in [:modes :temperature :data] (select-keys data [:temperature :humidity]))
                (fx/swap-context assoc-in [:modes :temperature :last-updated] (-> data :timestamp)))})

(defmethod handle-event :refresh-temperature-last-updated-relative [{:keys [fx/context state]}]
  (when-let [last-updated (-> state :modes :temperature :last-updated)]
    {:context (fx/swap-context context assoc-in [:modes :temperature :last-updated-relative] (date->relative last-updated))}))
