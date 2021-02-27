(ns app.events.factory
  (:require [cljfx.api :as fx]
            [app.events.handlers :as handlers]
            [app.events.api :refer [coerce-event]]
            [app.events.effects :refer [dispatch-n dispatch]]
            [app.cljfx-utils :refer [ctx-state]]))

(defn wrap-coerce-event [f & _]
  (fn [& args] (f (apply coerce-event args))))

(defn create-handler
  ([{:keys [context effects coeffects]}]
   (-> handlers/handle-event
       (fx/wrap-co-effects
        (merge {:fx/context (fx/make-deref-co-effect context)
                :state #(ctx-state @context)}
               (or coeffects {})))
       (fx/wrap-effects
        (merge {:context (fx/make-reset-effect context)
                :dispatch dispatch
                :dispatch-n dispatch-n}
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
    (dispatch :show-menu)
    (assert (true? (:menu? (ctx-state @*context))))))
