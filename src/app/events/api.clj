(ns app.events.api
  (:require [app.logger :as log]
            [clojure.core.async :refer [chan >! <! go go-loop close!]]))

(defn- register [*channels event-type]
  (let [c (chan)]
    (swap! *channels update event-type conj c)
    c))

(defn- unregister [*channels event-type c]
  (swap! *channels update event-type remove c))


(defn dispatch [*channels event]
  (go
    (let [event-channels (get @*channels (:event/type event))
          global-channels (get @*channels :global)]
      (when (or event-channels global-channels)
        (doseq [c (concat event-channels global-channels)]
          (>! c event))))))

(defn subscribe [*channels *state event-type callback]
  (let [c (register *channels event-type)]
    (go-loop []
      (try
        (callback (<! c) *state #(apply dispatch [*channels %]))
        (catch Exception err
          (log/error err)))
      (recur))
    (fn []
      (unregister *channels event-type c)
      (close! c))))

(defn create-event
  ([event-type] {:event/type event-type})
  ([event-type data] (assoc (create-event event-type)
                            :event/data data)))
