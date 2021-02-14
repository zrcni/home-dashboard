(ns app.events-test
  (:require [clojure.test :refer :all]
            [app.events.api :as events-api :refer [create-event]]
            [app.events.handlers :as handlers]
            [app.state :as state]
            [test-utils :refer [wait-until]]))

(defn init-events [*state]
  (let [*channels (atom {})
        dispatch #(events-api/dispatch *channels %)
        subscribe #(events-api/subscribe *channels *state %1 %2)]
    [dispatch subscribe]))

(deftest show-menu
  (testing "show menu"
    (let [*state (atom state/default-state)
          [dispatch subscribe] (init-events *state)]
      (handlers/register subscribe)
      (dispatch (create-event :show-menu))
      (wait-until (:menu? @*state)))))

(deftest hide-menu
  (testing "hide menu"
        (let [*state (atom state/default-state)
              [dispatch subscribe] (init-events *state)]
          (handlers/register subscribe)
          (dispatch (create-event :show-menu))
          (dispatch (create-event :hide-menu))
          (wait-until (not (:menu? @*state))))))

(deftest change-mode-static-image
  (testing "change active mode to static image"
    (let [*state (atom (assoc state/default-state :active-mode :wolfenstein))
          [dispatch subscribe] (init-events *state)]
      (handlers/register subscribe)
      (dispatch (create-event :activate-mode-static-image))
      (wait-until (= (:active-mode @*state) :static-image)))))

(deftest change-mode-hide-menu
  (testing "changing active mode hides menu"
    (let [*state (atom state/default-state)
          [dispatch subscribe] (init-events *state)]
      (handlers/register subscribe)
      (dispatch (create-event :show-menu))
      (dispatch (create-event :activate-mode-static-image))
      (wait-until (not (:menu? @*state))))))

(deftest change-mode-already-selected-hide-menu
  (testing "changing active mode to already selected only hides the menu"
    (let [*state (atom state/default-state)
          [dispatch subscribe] (init-events *state)]
      (handlers/register subscribe)
      (dispatch (create-event :activate-mode-static-image))
      (wait-until (= @*state
                     (assoc state/default-state :menu? false))))))
