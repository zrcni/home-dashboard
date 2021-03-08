(ns app.events-test
  (:require [clojure.test :refer [deftest]]
            [testit.core :refer [fact =eventually=>]]
            [app.state.default-state :refer [default-state]]
            [app.state.factory :refer [create-context]]
            [app.cljfx-utils :refer [ctx-state]]
            [app.events.factory :refer [create-dispatcher]]))

(deftest show-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :menu/show)

    (fact "menu is opened"
     (:menu? (ctx-state @*context)) =eventually=> true)))

(deftest hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :menu/show)
    (dispatch :menu/hide)
    (fact "menu is closed"
          (:menu? (ctx-state @*context)) =eventually=> false)))

(deftest change-view-gallery
  (let [*context (atom (create-context (assoc default-state
                                              :active-view :wolfenstein)))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-view/gallery)
    (fact "active view is changed to gallery"
     (:active-view (ctx-state @*context)) =eventually=> :gallery)))

(deftest change-view-wolfenstein
  (let [*context (atom (create-context (assoc default-state
                                              :active-view :gallery)))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-view/wolfenstein)
    (fact "active view is changed to wolfenstein"
     (:active-view (ctx-state @*context)) =eventually=> :wolfenstein)))

(deftest change-view-hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :menu/show)
    (dispatch :show-view/gallery)
    (fact "changing view hides the menu"
          (:menu? (ctx-state @*context)) =eventually=> false)))

(deftest change-view-already-selected-hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-view/gallery)
    (fact "activating already active view hides the menu"
          (:menu? (ctx-state @*context)) =eventually=> false)))
