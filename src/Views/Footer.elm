module Views.Footer exposing (footer)

import Color exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
import Msgs exposing (Msg(..))
import Time


formatTime : Int -> String
formatTime time =
    let
        timeLength =
            String.fromInt time |> String.length
    in
    {--1桁(0も含む)なら0挿入--}
    if timeLength == 1 then
        String.fromInt time |> String.append "0"

    else
        String.fromInt time


timeContent : Int -> Int -> Int -> String
timeContent hour minute second =
    let
        hourStr =
            formatTime hour

        minuteStr =
            formatTime minute

        secondStr =
            formatTime second
    in
    hourStr ++ ":" ++ minuteStr ++ ":" ++ secondStr


footer : Model -> Html Msg
footer model =
    let
        hour =
            Time.toHour model.zone model.time

        minute =
            Time.toMinute model.zone model.time

        second =
            Time.toSecond model.zone model.time
    in
    div
        [ style "width" "100%"
        , style "background-color" (Color.toCssString (rgb255 255 125 17))
        , style "position" "absolute"
        , style "bottom" "0"
        , style "right" "0"
        , style "padding" "0px 16px"
        ]
        [ div [ style "color" "white" ]
            [ text (timeContent hour minute second) ]
        ]
