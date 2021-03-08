(ns app.wolfenstein.core
  (:require [app.wolfenstein.api :refer [create-activate]]
            [app.wolfenstein.random :refer [update-image]]
            [app.utils :refer [s->ms]]))

(def activate (create-activate update-image (s->ms 2)))
