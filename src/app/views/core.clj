(ns app.views.core
  (:require [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.events :as events]))

(defn root [{:keys [menu? mode style]}]
  {:fx/type :stage
   :showing true
   :full-screen true
   :title "beep boop"
   :on-close-request {:event/type ::events/window-closed}
   :scene (if menu?
            {:fx/type menu-view
             :style style}
            {:fx/type main-view
             :style style
             :mode mode})})
