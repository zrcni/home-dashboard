(ns app.events.effects
  (:require [app.wolfenstein.core :as wolfenstein]
            [app.events.api :refer [create-event coerce-event]]))

(defn wolfenstein-activate! [_ dispatch!]
  (when-let [deactivate-fn (wolfenstein/activate #(dispatch! (create-event :wolfenstein/image-updated {:img-n %})))]
    (dispatch! (create-event :wolfenstein/add-deactivate-fn {:deactivate-fn deactivate-fn}))))

(defn wolfenstein-deactivate! [deactivate-fn dispatch!]
  (deactivate-fn)
  (dispatch! :wolfenstein/remove-deactivate-fn))

(defn dispatch [e dispatch!]
  (dispatch! (coerce-event e)))

(defn dispatch-n [events dispatch!]
  (doseq [e events]
    (dispatch! (coerce-event e))))
