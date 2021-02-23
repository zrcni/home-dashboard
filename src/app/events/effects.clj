(ns app.events.effects
  (:require [app.events.api :refer [create-event]]
            [app.wolfenstein-mode.core :as wolfenstein-mode]))

(defn activate-mode-wolfenstein! [_ dispatch!]
  (let [deactivate (wolfenstein-mode/activate #(dispatch! (create-event :wolfenstein-image-updated {:img-n %})))]
    (dispatch! (create-event :set-deactivate-fn {:mode :wolfenstein
                                                 :deactivate-fn deactivate}))))

(defn deactivate-mode-wolfenstein! [deactivate dispatch!]
  (deactivate)
  (dispatch! (create-event :set-deactivate-fn {:mode :wolfenstein
                                               :deactivate-fn nil})))

(defn dispatch-n [events dispatch!]
  (doseq [e events]
    (dispatch! e)))
