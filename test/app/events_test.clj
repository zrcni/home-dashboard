(ns app.events-test
  (:require [clojure.test :refer :all]
            [app.state.default-state :refer [default-state]]
            [app.state.factory :refer [create-context]]
            [app.cljfx-utils :refer [ctx-state]]
            [test-utils :refer [wait-until create-dispatcher]]))

(deftest show-menu
  (testing "show menu"
    (let [*context (atom (create-context default-state))
          dispatch (create-dispatcher {:context *context})]
      (dispatch :show-menu)
      (wait-until (:menu? (ctx-state @*context))))))

(deftest hide-menu
  (testing "hide menu"
        (let [*context (atom (create-context default-state))
              dispatch (create-dispatcher {:context *context})]
          (dispatch :show-menu)
          (dispatch :hide-menu)
          (wait-until (not (:menu? (ctx-state @*context)))))))

(deftest change-mode-static-image
  (testing "change active mode to static image"
    (let [*context (atom (create-context (assoc default-state
                                                :active-mode :wolfenstein)))
          dispatch (create-dispatcher {:context *context})]
      (dispatch :activate-mode-static-image)
      (wait-until (= (:active-mode (ctx-state @*context)) :static-image)))))

(deftest change-mode-wolfenstein
  (testing "change active mode to wolfenstein"
    (let [*context (atom (create-context (assoc default-state
                                                :active-mode :static-image)))
          dispatch (create-dispatcher {:context *context})]
      (dispatch :activate-mode-wolfenstein)
      (wait-until (= (:active-mode (ctx-state @*context)) :wolfenstein)))))

(deftest change-mode-hide-menu
  (testing "changing active mode hides menu"
    (let [*context (atom (create-context default-state))
          dispatch (create-dispatcher {:context *context})]
      (dispatch :show-menu)
      (dispatch :activate-mode-static-image)
      (wait-until (not (:menu? (ctx-state @*context)))))))

(deftest change-mode-already-selected-hide-menu
  (testing "changing active mode to already selected only hides the menu"
    (let [*context (atom (create-context default-state))
          dispatch (create-dispatcher {:context *context})]
      (dispatch :activate-mode-static-image)
      (wait-until (not (:menu? (ctx-state @*context)))))))
