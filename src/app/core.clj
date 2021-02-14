(ns app.core
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*state]]
            [app.events :as events]))

(def renderer
  (fx/create-renderer
   :opts {:fx.opt/map-event-handler events/handle}
   :middleware (fx/wrap-map-desc views/root)))

(fx/mount-renderer *state renderer)
