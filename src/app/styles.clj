(ns app.styles
  (:require [cljfx.css :as css]))

(def style
  (let [bg-color "black"
        text-color "white"]
    (css/register
     ::style
     {".menu-button" {:-fx-cursor :hand
                      :-fx-text-base-color text-color
                      :-fx-background-color "#111111"
                      :-fx-font-family "Roboto"
                      :-fx-font-size "20px"
                      :-fx-font-weight "bold"
                      :-fx-font-smoothing-type "lcd"
                      :-fx-border-width 2
                      :-fx-border-color "white"
                      ":hover, :focused" {:-fx-border-color "#b32cd1"
                                          :-fx-border-width 3
                                          :-fx-text-base-color "#b32cd1"}}
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
                     :-fx-font-weight "bold"}})))
