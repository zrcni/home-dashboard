(ns app.state
  (:require [app.styles :refer [style]]))

(def default-state {:menu? false
                    :mode :static-image
                    :style style})
(def *state
  (atom default-state))

(defn reset []
  (reset! *state default-state))
