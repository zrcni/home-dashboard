(ns app.wolfenstein-mode.core
  (:require [app.wolfenstein-mode.api :refer [create-activate]]
            [app.wolfenstein-mode.random :refer [update-image]]
            [app.utils :refer [s->ms]]))

(def activate (create-activate update-image (s->ms 2)))
 