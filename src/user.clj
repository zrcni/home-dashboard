(ns user
  (:require [cljfx.api :as fx]
            [app.views.core :as views]
            [app.state :refer [*state]]
            [app.events.core :refer [dispatch]]
            [app.styles :refer [style]]
            [clojure.tools.namespace.repl :refer [refresh]]))

(def renderer
  (fx/create-renderer
   :opts {:fx.opt/map-event-handler
          #(dispatch (select-keys % [:event/type :event/data]))}
   :middleware (fx/wrap-map-desc #'views/root)))

(defn mount []
  (fx/mount-renderer *state renderer))

(defn unmount []
  (fx/unmount-renderer *state renderer))

(defn rerender []
  (unmount)
  (mount))

;; Refresh styles in state whenever they change to
;; make the app rerender with updated styles.
(defn watch-styles []
  (add-watch #'style :refresh-styles (fn [_ _ _ _]
                                       (swap! *state assoc :style style))))

(defn stop-watch-styles []
  (remove-watch #'style :refresh-styles))

(defn start []
  (watch-styles)
  (rerender))

(defn stop []
  (stop-watch-styles)
  (unmount))
