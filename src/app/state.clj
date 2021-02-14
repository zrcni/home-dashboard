(ns app.state
  (:require [app.styles :refer [style]]))

(def *state
  (atom {:menu? false
         :mode :static-image
         :style style}))
