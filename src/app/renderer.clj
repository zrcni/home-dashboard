(ns app.renderer
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*context]]
            [app.events.core :refer [handle-event]]))

(def renderer
  (fx/create-renderer
   :middleware (comp
                fx/wrap-context-desc
                (fx/wrap-map-desc (fn [_] {:fx/type views/root})))
   :opts {:fx.opt/type->lifecycle #(or (fx/keyword->lifecycle %)
                                       (fx/fn->lifecycle-with-context %))
          :fx.opt/map-event-handler handle-event}))

(defn mount []
  (fx/mount-renderer *context renderer))

(defn unmount []
  (fx/unmount-renderer *context renderer))
