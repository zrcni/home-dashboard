(ns mobile.view
  (:require [reagent.react-native :as rn]
            [mobile.state :refer [*state]]
            [mobile.api :as api]))

(def view-titles
  {:dashboard "Dashboard"
   :gallery "Gallery"
   :wolfenstein "Wolfenstein"})

(def text-style {:color "white"})

(def styles {:conn-error {:color "red"
                          :font-size 25
                          :text-align "center"}
             :app-view {:width "100%"
                        :flex 1
                        :flex-direction "column"
                        :justify-content "space-between"
                        :background-color "#242424"}
             :status-title (merge text-style
                                  {:font-size 50
                                   :text-align "center"
                                   :padding-top 20})
             :status-text (merge text-style
                                 {:font-size 18
                                  :text-align "center"
                                  :padding-top 10})
             :action-btn {:height 100
                          :border-bottom-width 2}
             :disabled-btn-text {:text-decoration-line "line-through"
                            :text-decoration-style "solid"}
             :action-btn-view {:flex 1
                               :align-items "center"
                               :flex-direction "column"
                               :justify-content "center"
                               :padding 20
                               :background-color "#383838"}
             :action-btn-text (merge text-style
                                     {:font-weight "bold"
                                      :font-size 25})})

(defn menu-button [{:keys [title disabled? on-press]}]
  [rn/touchable-highlight {:style (:action-btn styles)
                           :disabled (true? disabled?)
                           :on-press-out on-press }
   [rn/view {:style (:action-btn-view styles)}
    [rn/text {:style (merge (:action-btn-text styles)
                            (if disabled? (:disabled-btn-text styles) {}))} title]]])

(defn action-buttons [{:keys [disabled?]}]
  (let [disabled-btn? (fn [view]
                        (= (-> @*state :data :active-view) view))]
    [rn/view
     [menu-button {:title (:gallery view-titles)
                   :disabled? (or disabled? (disabled-btn? :gallery))
                   :on-press #(api/change-view :gallery)}]
     [menu-button {:title (:wolfenstein view-titles)
                   :disabled? (or disabled? (disabled-btn? :wolfenstein))
                   :on-press #(api/change-view :wolfenstein)}]
     [menu-button {:title (:dashboard view-titles)
                   :disabled? (or disabled? (disabled-btn? :dashboard))
                   :on-press #(api/change-view :dashboard)}]]))

(defn status []
  (let [title (get view-titles (-> @*state :data :active-view))]
    [rn/view
     [rn/text {:style (:status-title styles)} (or title "Unknown")]
     [rn/text {:style (:status-text styles)} "ACTIVE VIEW"]]))

(defn connection-status []
  [rn/view
   (when-not (-> @*state :connected?)
     [rn/text {:style (:conn-error styles)} "Disconnected"])])

(defn main-view []
  [rn/view {:style (:app-view styles)}
   [status]
   [connection-status]
   [action-buttons {:disabled? (not (:connected? @*state))}]])

(defn loading-view []
  [rn/view
   [rn/text "Loading..."]])

(defn app []
  (if (:loading? @*state)
    [loading-view]
    [main-view]))
