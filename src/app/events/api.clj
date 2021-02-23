(ns app.events.api)

  (defn create-event
    ([event-type] {:event/type event-type})
    ([event-type data] (assoc (create-event event-type)
                              :event/data data)))
