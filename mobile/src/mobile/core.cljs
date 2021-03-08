(ns mobile.core
  (:require [reagent.core :as r]
            [clojure.core.async :refer [go go-loop <! timeout]]
            [mobile.state :refer [*state]]
            [mobile.view :refer [app]]
            [mobile.api :as api]
            [mobile.utils :refer-macros [<?]]))

(defn init-state []
  (go 
    (try
      (let [data (<? (api/get-state))]
        (swap! *state assoc
               :loading? false
               :connected? true
               :data data))
      (catch js/Error err
        (prn "Failed to initialize state: " (ex-message err))
        (swap! *state assoc
               :loading? false)))))

(defonce *poll-ch (atom nil))

;; TODO: increase timeout on successive error
(defn refresh-dashboard-state []
  (go
    (try
      (let [data (<? (api/get-state))]
        (swap! *state assoc :data data)
        (when-not (:connected? @*state)
          (swap! *state assoc :connected? true)))
      (catch js/Error err
        (prn "Failed to refresh dashboard state: " (ex-message err))
        (when (:connected? @*state)
          (swap! *state assoc :connected? false))))))

(defn poll-dashboard-state []
  (when-not @*poll-ch
    (reset! *poll-ch (go-loop []
                       (<! (timeout 1000))
                       (<! (refresh-dashboard-state))
                       (recur)))))

(defn ^:export -main [& _args]
  (init-state)
  (poll-dashboard-state)
  (r/as-element [app]))
