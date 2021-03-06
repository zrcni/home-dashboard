(ns app.components.core
  (:require [cljfx.api :as fx]
            [app.subs :as subs]
            [app.events.api :refer [create-event]]
            [app.components.menu :refer [menu]]))

(defn- toolbar-action [{:keys [fx/context text on-action width]}]
  (let [toolbar-visible? (fx/sub-ctx context subs/toolbar-visible?)]
    {:fx/type :button
     :pref-width (or width 120)
     :style-class (filterv #(some? %)
                           ["button" "toolbar-button"
                            (when-not toolbar-visible? "transparent")])
     :on-action (if toolbar-visible?
                  on-action
                  (create-event :toolbar/toggle-visibility))
     :text text}))

(def ^:private hide-button {:fx/type toolbar-action
                  :on-action (create-event :toolbar/toggle-visibility)
                  :visible? true
                  :width 60
                  :text "Hide"})

;; TODO: fade out
(defn- toolbar [{:keys [actions]}]
    {:fx/type :h-box
     :pick-on-bounds false
     :alignment :bottom-center
     :children (cons hide-button
                     (mapv #(merge % {:fx/type toolbar-action}) actions))})

(defn- toggle-menu-button [{:keys [on-action]}]
  {:fx/type :button
   :style-class "toggle-menu-button"
   :pref-width 100
   :pref-height 100
   :opacity 0
   :on-action on-action})

(defn- create-overlay-button [alignment]
  {:fx/type toggle-menu-button
   :stack-pane/alignment alignment
   :on-action (create-event :menu/toggle)})

(def ^:private overlay-buttons
  (mapv #(create-overlay-button %) [:top-right :top-left :bottom-right :bottom-left]))

(defn create-view-with-overlay
  ([view] (create-view-with-overlay view nil))
  ([view toolbar-actions]
   {:fx/type (fn [{:keys [fx/context]}]
               (let [menu? (fx/sub-ctx context subs/menu?)]
                 (if menu?
                   {:fx/type menu}
                   {:fx/type :stack-pane
                    :style-class "main-view"
                    :children (concat [view]
                                      (if toolbar-actions
                                        [{:fx/type toolbar
                                          :stack-pane/alignment :bottom-center
                                          :actions toolbar-actions}]
                                        [])
                                      overlay-buttons)})))}))
