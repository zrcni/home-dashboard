(ns app.events.factory
  (:require [cljfx.api :as fx]
            [app.events.handlers :as handlers]
            [app.events.api :refer [coerce-event]]
            [app.events.effects :as app-effects]
            [app.cljfx-utils :refer [ctx-state]]))

(defn wrap-coerce-event [f & _]
  (fn [& args] (f (apply coerce-event args))))

(defn make-get-ctx-state-co-effect
  "Derefs the context atom and gets the current state from it"
  [*context]
  #(ctx-state (deref *context)))

(defn create-handler
  ([{:keys [context effects coeffects]}]
   (-> handlers/handle-event
       (fx/wrap-co-effects
        ;; The context coeffect is an atom
        (merge {:fx/context #(identity context)
                :state (make-get-ctx-state-co-effect context)}
               (or coeffects {})))
       (fx/wrap-effects
        ;; Updating context as an effect doesn't work consistently within the dispatch-n effect.
        ;; Sometimes the same *dereferenced* context is passed into multiple effect
        ;; handlers causing only one of them to actually update the context atom.
        ;; Another situation where the same thing can happen is when
        ;; :conditions-updated is dispatched at the same time as some other action.
        (merge {:context #(throw (ex-message "Do not use the fx/context coeffect!"))
                :dispatch app-effects/dispatch
                :dispatch-n app-effects/dispatch-n
                :wolfenstein/activate! app-effects/wolfenstein-activate!
                :wolfenstein/deactivate! app-effects/wolfenstein-deactivate!}
               (or effects {})))
       (wrap-coerce-event))))

(defmulti create-dispatcher
  (fn [param]
    (cond
      (fn? param) :func
      (map? param) :desc
      :else (throw (ex-message (str "Invalid parameter type:" (type param)))))))

;; Create dispatcher when the event handler
;; function needs to be accessed separately.
(defmethod create-dispatcher
  :func
  [handle-event]
  (fn [& args]
    (apply handle-event args)))

;; Create event handler and return the dispatcher when
;; the event handler doesn't need to be accessed separately.
(defmethod create-dispatcher
  :desc
  [desc]
  (let [handle-event (create-handler desc)]
    (fn [& args]
      (apply handle-event args))))

(comment
  "Example usage in tests"
  (require '[app.events.factory :refer [create-dispatcher]]
           '[app.state.default-state :refer [default-state]]
           '[app.state.factory :refer [create-context]])

  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]

    (assert (false? (:menu? (ctx-state @*context))))
    (dispatch :menu/show)
    (assert (true? (:menu? (ctx-state @*context))))))
