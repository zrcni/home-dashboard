(ns app.state
  (:require [cljfx.api :as fx]
            [clojure.core.cache :as cache]
            [app.styles :refer [style]]))

(def default-state {:menu? false
                    :fullscreen? true
                    :active-mode :static-image
                    :modes {:static-image {:image "app/images/static-image/tonnin-seteli.png"}
                            :wolfenstein {:image "app/images/wolfenstein/1.png"
                                          :deactivate-fn nil}
                            :temperature {:data nil
                                          :last-updated nil
                                          :last-updated-relative nil}}
                    :style style})
(def *context
  (atom (fx/create-context default-state cache/lru-cache-factory)))

(defn reset []
  (reset! *context default-state))
