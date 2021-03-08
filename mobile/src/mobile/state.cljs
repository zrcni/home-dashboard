(ns mobile.state
  (:require [reagent.core :as r]))

(def *state (r/atom {:connected? false
                     :loading? true
                     :data nil}))
