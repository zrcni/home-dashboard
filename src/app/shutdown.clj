(ns app.shutdown
  (:require [app.logger :as log]))

(defonce register-promise (promise))
(defonce *registered-hooks (atom {}))

(defn execute-hooks! []
  (log/info "Shutting down...")
  (doseq [[_key f] @*registered-hooks]
    (f)))

(defn add-hook
  [key f]
  (swap! *registered-hooks assoc key f)

  (when (not (realized? register-promise))
    (.addShutdownHook (Runtime/getRuntime)
                      (Thread. ^Runnable execute-hooks!))
    (deliver register-promise true)))
