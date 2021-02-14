(ns user
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*state]]
            [app.events :as events]
            [app.styles :refer [style]]))

(def renderer
  (fx/create-renderer
   :opts {:fx.opt/map-event-handler #'events/handle}
   :middleware (fx/wrap-map-desc #'views/root)))

(defn mount []
  (fx/mount-renderer *state renderer))

(defn unmount []
  (fx/unmount-renderer *state renderer))

(defn rerender []
  (unmount)
  (mount))

;; Refresh styles whenever they change to
;; make the app rerender with updated styles.
(defn watch-styles []
  (add-watch #'style :refresh-styles #(swap! *state assoc :style style)))

(defn stop-watch-styles []
  (remove-watch #'style :refresh-styles))

(defn start []
  (watch-styles)
  (rerender))

(defn stop []
  (stop-watch-styles)
  (unmount))
