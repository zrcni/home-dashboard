(ns app.events-test
  (:require [clojure.test :refer [deftest]]
            [testit.core :refer [fact =eventually=>]]
            [app.state.default-state :refer [default-state]]
            [app.state.factory :refer [create-context]]
            [app.cljfx-utils :refer [ctx-state]]
            [test-utils :refer [create-dispatcher]]))

(deftest show-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-menu)

    (fact "menu is opened"
     (:menu? (ctx-state @*context)) =eventually=> true)))


(deftest hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-menu)
    (dispatch :hide-menu)
    (fact "menu is closed"
          (:menu? (ctx-state @*context)) =eventually=> false)))

(deftest change-mode-static-image 
  (let [*context (atom (create-context (assoc default-state
                                              :active-mode :wolfenstein)))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :activate-mode-static-image)
    (fact "active mode is changed to :static-image"
     (:active-mode (ctx-state @*context)) =eventually=> :static-image)))

(deftest change-mode-wolfenstein
  (let [*context (atom (create-context (assoc default-state
                                              :active-mode :static-image)))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :activate-mode-wolfenstein)
    (fact "active mode is changed to :wolfenstein"
     (:active-mode (ctx-state @*context)) =eventually=> :wolfenstein)))

(deftest change-mode-hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :show-menu)
    (dispatch :activate-mode-static-image)
    (fact "changing mode hides the menu"
     (:menu? (ctx-state @*context)) =eventually=> false)))

(deftest change-mode-already-selected-hide-menu
  (let [*context (atom (create-context default-state))
        dispatch (create-dispatcher {:context *context})]
    (dispatch :activate-mode-static-image)
    (fact "activating already active mode hides the menu"
          (:menu? (ctx-state @*context)) =eventually=> false)))
