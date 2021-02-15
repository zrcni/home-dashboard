(ns app.state
  (:require [app.styles :refer [style]]))

(def default-state {:menu? false
                    :active-mode :static-image
                    :modes {:static-image {:image "app/images/static-image/batmaaaaan.jpg"}
                            :wolfenstein {:image "app/images/wolfenstein/1.png"
                                          :stop nil}}
                    :style style})
(def *state
  (atom default-state))

(defn reset []
  (reset! *state default-state))
