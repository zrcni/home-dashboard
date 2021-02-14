(ns app.view
  (:require [app.events :as events]))

(defn image [{:keys [image on-click]}]
  {:fx/type :image-view
   :on-mouse-clicked on-click
   :image image})

(defn menu [props]
  {:fx/type :v-box
   :alignment :center
   :children [{:fx/type :button
               :on-action {:event/type ::events/hide-menu}
               :text "Hide menu"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :static-image}
               :text "Static image"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :wolfenstein}
               :text "Wolfenstein"}
              {:fx/type :button
               :on-action {:event/type ::events/change-mode
                           :mode :temperature}
               :text "Temperature"}]})

(defn menu-scene []
  {:fx/type :scene
   :root {:fx/type :v-box
          :alignment :center
          :children [{:fx/type menu}]}})

(defn main-scene [{:keys [mode]}]
  {:fx/type :scene
   :root {:fx/type :v-box
          :alignment :center
          :children (case mode
                      :static-image [{:fx/type image
                                      :on-click {:event/type ::events/show-menu}
                                      :image "app/images/batmaaaaan.jpg"}]
                      [])}})

(defn root [{:keys [menu? mode]}]
  {:fx/type :stage
   :showing true
   :title "beep boop"
   :width 500
   :height 500
   :on-close-request {:event/type ::stop}
   :scene (if menu?
            (menu-scene)
            (main-scene {:mode mode}))})
