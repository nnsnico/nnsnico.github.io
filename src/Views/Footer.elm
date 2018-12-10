module Views.Footer exposing (footer)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Row as Row
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
    Html.footer
        [ style "background-color" (Color.toCssString (rgb255 255 125 17))
        , style "padding" "2rem 0"
        , style "margin-top" "4rem"
        ]
        [ Grid.container [ style "color" "white" ]
            [ Grid.row []
                [ Grid.col []
                    [ text "Created by "
                    , a
                        [ href "https://github.com/nnsnico"
                        , style "color" "white"
                        ]
                        [ text "@nnsnico" ]
                    ]
                , Grid.col []
                    [ text (timeContent hour minute second) ]
                ]
            ]
        ]
