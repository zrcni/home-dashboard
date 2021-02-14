(ns app.events-test
  (:require [clojure.test :refer :all]
            [app.events :as events]
            [app.state :as state]))

(deftest non-existing-event
  (testing "non-existing event does not modify state"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type :non-existing-event})
      (is (= @*state state/default-state)))))

(deftest show-menu
  (testing "show menu"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type ::events/show-menu})
      (is (:menu? @*state)))))

(deftest hide-menu
  (testing "hide menu"
        (let [*state (atom state/default-state)
              handle (events/create-handle *state)
              emit (events/create-emit handle)]
          (emit {:event/type ::events/show-menu})
          (emit {:event/type ::events/hide-menu})
          (is (not (:menu? @*state))))))

(deftest change-mode-static-image
  (testing "change active mode to static image"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type ::events/change-mode
             :active-mode :static-image})
      (is (= (:active-mode @*state) :static-image)))))

(deftest change-mode-hide-menu
  (testing "changing active mode hides menu"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type ::events/show-menu})
      (emit {:event/type ::events/change-mode
             :active-mode :static-image})
      (is (not (:menu? @*state))))))

(deftest change-mode-to-non-existing
  (testing "changing active mode to non-existing mode does modify state"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type ::events/change-mode
             :active-mode :non-existing-mode})
      (is (= @*state state/default-state)))))

(deftest change-mode-already-selected-hide-menu
  (testing "changing active mode to already selected only hides the menu"
    (let [*state (atom state/default-state)
          handle (events/create-handle *state)
          emit (events/create-emit handle)]
      (emit {:event/type ::events/change-mode
             :active-mode :static-image})
      (is (= state/default-state
             (assoc state/default-state :menu? false))))))
