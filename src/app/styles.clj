(ns app.styles
  (:require [cljfx.css :as css]))

(def style
  (css/register
   ::style
   {".menu-button" {:-fx-cursor :hand}
    ".main-view" {:-fx-background-color :black}}))
