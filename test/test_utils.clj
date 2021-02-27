(ns test-utils
  (:import java.time.Instant)
  (:require [app.events.factory
             :refer [create-dispatcher]
             :rename {create-dispatcher create-dispatcher-original}]
            [app.events.effects :as effects]))

(defn create-dispatcher
  "Add custom effects by default"
  [desc]
  (create-dispatcher-original (merge {:effects {:activate-mode-wolfenstein! effects/activate-mode-wolfenstein!
                                                :deactivate-mode-wolfenstein! effects/deactivate-mode-wolfenstein!}}
                                     desc)))

(defn now-ms []
  (.toEpochMilli (Instant/now)))

(def default-wait-death 5000)
(def default-wait-delay-ms 10)

;; TODO: implement assertions if it's possible
;; Right now test runner says there are no assertions.
(defn wait-until*
  "wait until a function has become true"
  ([name fn] (wait-until* name fn default-wait-death))
  ([name fn wait-death]
   (let [die (+ (now-ms) wait-death)]
     (loop []
       (if-let [result (fn)]
         result
         (do
           (Thread/sleep default-wait-delay-ms)
           (if (> (now-ms) die)
             (throw (Exception. (str "timed out waiting for: " name)))
             (recur))))))))

(defmacro wait-until
  [expr]
  `(wait-until* ~(pr-str expr) (fn [] ~expr)))
