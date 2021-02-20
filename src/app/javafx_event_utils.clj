(ns app.javafx-event-utils
  (:import javafx.scene.input.KeyEvent
           javafx.scene.input.KeyCode))

;; Only contains the used key codes
;; Here's the rest: https://docs.oracle.com/javase/8/javafx/api/javafx/scene/input/KeyCode.html
(def key-codes {:esc KeyCode/ESCAPE})

(defn key-event? [e]
  (instance? KeyEvent e))

(defn key-released?
  ([e] (key-released? e nil))
  ([e code]
   (and (key-event? e)
        (= KeyEvent/KEY_RELEASED (.getEventType e))
        (if (contains? key-codes code)
          (= (.getCode e) (get key-codes code))
          true))))
