(ns app.events.effects
  (:require [app.wolfenstein-mode.core :as wolfenstein-mode]
            [app.events.api :refer [create-event coerce-event]]))

(defn activate-mode-wolfenstein! [_ dispatch!]
  (when-let [deactivate (wolfenstein-mode/activate #(dispatch! (create-event :wolfenstein-image-updated {:img-n %})))]
    (dispatch! (create-event :set-deactivate-fn {:mode :wolfenstein
                                                 :deactivate-fn deactivate}))))

(defn deactivate-mode-wolfenstein! [deactivate dispatch!]
  (deactivate)
  (dispatch! (create-event :set-deactivate-fn {:mode :wolfenstein
                                               :deactivate-fn nil})))

(defn dispatch [e dispatch!]
  (dispatch! (coerce-event e)))

(defn dispatch-n [events dispatch!]
  (doseq [e events]
    (dispatch! (coerce-event e))))
