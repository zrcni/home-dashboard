(ns app.core
  (:require [app.renderer :refer [mount! unmount!]]
            [app.dev]
            [app.mqtt :as mqtt]
            [app.conditions.mqtt :as conditions-mqtt]
            [app.state.core :as state]
            [app.events.core :refer [dispatch]]))

(def start mount!)
(def stop unmount!)

(mqtt/connect!)
(conditions-mqtt/subscribe)
(state/on-updated (fn [state]
                    (mqtt/publish "home/dashboard/state_updated" state)))

(app.mqtt/subscribe "home/dashboard/change_view"
                    (fn [data]
                      (when-let [action (case (-> data :view keyword)
                                          :gallery :show-view/gallery
                                          :dashboard :show-view/dashboard
                                          :wolfenstein :show-view/wolfenstein
                                          nil)]
                        (dispatch action))))
