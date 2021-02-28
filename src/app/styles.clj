(ns app.styles
  (:require [cljfx.css :as css]
            [app.config :refer [cfg]]))

(def style
  (let [bg-color "black"
        text-color "white"]
    (css/register
     ::style
     {".menu-button" (-> {:-fx-text-base-color text-color
                          :-fx-background-color "#111111"
                          :-fx-font-family "Roboto"
                          :-fx-font-size "20px"
                          :-fx-font-weight "bold"
                          :-fx-font-smoothing-type "lcd"
                          :-fx-border-width 2
                          :-fx-border-color "white"}
                         ;; set menu button cursor style only when cursor is enabled
                         (as-> s (if (:cursor? cfg) (assoc s :-fx-cursor :hand) s)))
      ".menu-button:hover, .menu-button:focused" {:-fx-border-color "#b32cd1"
                                                  :-fx-border-width 3
                                                  :-fx-text-base-color "#b32cd1"}

      ".main-view" {:-fx-background-color bg-color}
      ".menu-view" {:-fx-background-color bg-color}
      ".temperature-mode-row" {:-fx-padding "0px 0px 3em 0px"}
      ".temperature-mode-text" {:-fx-fill text-color
                                :-fx-font-family "Roboto"
                                :-fx-font-smoothing-type "lcd"}
      ".last-updated-row" {:-fx-padding "2em 0px 0px 0px"}
      ".temperature-text" {:-fx-font-size "2.8em"
                           :-fx-font-weight "bold"}
      ".humidity-text" {:-fx-font-size "1em"
                        :-fx-font-weight "bold"}
      ".last-updated-text" {:-fx-font-size "1em"
                            :-fx-font-weight "bold"}
      ".temperature-mode-label" {:-fx-font-size "0.8em"}
      ".temperature-mode-no-data-text" {:-fx-font-size "1.2em"}
      ".clock-text" {:-fx-font-size "4em"
                     :-fx-font-weight "bold"}
      ".thumbnail-button:hover" (-> {
                                     :-fx-effect "innershadow(one-pass-box, rgba(0,0,0,1), 10, 1, 0, 0)"}
                                    (as-> s (if (:cursor? cfg)
                                              (assoc s :-fx-cursor :hand)
                                              s)))
      ".thumbnail-scroll-pane" {:-fx-background-color bg-color}})))
