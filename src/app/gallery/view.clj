(ns app.gallery.view
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.config :refer [cfg]]
            [app.events.api :refer [create-event]]))

(defn gallery-image [{:keys [image]}]
  {:fx/type :image-view
   :style-class "main-image"
   :preserve-ratio true
   :fit-height 600
   :image image})

(defn thumbnail-button [{:keys [image on-action]}]
  {:fx/type :button
   :style-class "thumbnail-button"
   :on-action on-action
   :graphic {:fx/type :image-view
             :fit-width 480
             :preserve-ratio true
             :image image}})

(defn thumbnail-list [{:keys [images]}]
  {:fx/type :scroll-pane
   :style-class "thumbnail-scroll-pane"
   :fit-to-width true
  ;; Scroll bar must be shown, because scrolling with touch doesn't work ATM.
   :vbar-policy (if (:cursor? cfg) :never :always)
   :hbar-policy :never
   :content {:fx/type :v-box
             :alignment :center
             :children (mapv
                        (fn [image]
                          {:fx/type thumbnail-button
                           :image image
                           :on-action (create-event :gallery/select-image {:image image})})
                        images)}})

(defn root [{:keys [fx/context]}]
  (let [{:keys [image images selecting?]} (fx/sub-ctx context subs/gallery)]
    {:fx/type :v-box
     :alignment :center
     :children [(if selecting?
                  {:fx/type thumbnail-list
                   :images images}
                  {:fx/type gallery-image
                   :image image})]}))
