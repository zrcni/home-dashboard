(ns app.state.default-state
  (:require [app.config :refer [cfg]]
            [app.gallery.core :as gallery]))

(def default-state
  {:menu? false
   :toolbar-visible? false
   :fullscreen? (:fullscreen? cfg)
   :active-view :gallery
   :gallery {:image gallery/default-image
             :images []
             :selecting? false}
   :wolfenstein {:image "images/wolfenstein/1.png"
                 :deactivate-fn nil}
   :conditions {:data nil
                :last-updated nil
                :last-updated-relative nil}})
