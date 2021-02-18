(ns app.styles
  (:require [cljfx.css :as css]))

(def style
  (css/register
   ::style
   {".menu-button" {:-fx-cursor :hand
                    :-fx-text-base-color "#333333"
                    :-fx-background-color "#f5f3ed"
                    ":hover" {:-fx-border-color "#333333"}}
    ;; TODO: figure out how to change text color LOL
    ;; Then switch back to black background
    ".main-view" {:-fx-background-color "white"#_"black"}
    ".some-text" {:-fx-text-base-color "white"
                  :-fx-text-fill "white"}}))
