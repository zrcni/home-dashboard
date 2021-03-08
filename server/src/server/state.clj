(ns server.state
  (:import java.time.Instant))

(def *dashboard-state (atom {:active-view :dashboard
                             :last-updated (str (Instant/now))}))
