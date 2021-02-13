(ns app.main
  (:require [cljfx.api :as fx]
            [app.view :as view]
            [app.state :refer [*state]]
            [app.events :refer [handle-event]]))

(def renderer
  (fx/create-renderer
   :opts {:fx.opt/map-event-handler handle-event}
   :middleware (fx/wrap-map-desc view/root)))

(fx/mount-renderer *state renderer)
