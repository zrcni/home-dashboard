(ns app.state.default-state
  (:require [app.config :refer [cfg]]))

(def default-state
  {:menu? false
   :fullscreen? (:fullscreen? cfg)
   :active-view :gallery
   :gallery {:image "app/images/gallery/tonnin-seteli.png"
             :images []
             :selecting? false}
   :wolfenstein {:image "app/images/wolfenstein/1.png"
                 :deactivate-fn nil}
   :conditions {:data nil
                :last-updated nil
                :last-updated-relative nil}})
