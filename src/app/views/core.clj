(ns app.views.core
  (:require [app.views.menu.core :refer [menu-view]]
            [app.views.main.core :refer [main-view]]
            [app.events :as events]))

(defn root [{:keys [menu? mode]}]
  {:fx/type :stage
   :showing true
   :title "beep boop"
   :width 500
   :height 500
   :on-close-request {:event/type ::events/window-closed}
   :scene (if menu?
            (menu-view)
            (main-view {:mode mode}))})
