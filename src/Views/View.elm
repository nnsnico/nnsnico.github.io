module Views.View exposing (view)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Color exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Models.Model exposing (..)
import Msgs exposing (..)
import Views.Footer exposing (footer)
import Views.GifGanarator exposing (gifGenerator)
import Views.Header exposing (header)
import Views.MemoList exposing (memoList)
import Views.RandomGenerator exposing (randomGenerator)


view : Model -> Html Msg
view model =
    Grid.container [ style "max-width" "100%" ]
        [ CDN.stylesheet
        , CDN.fontAwesome
        , div [ style "margin-top" "60px" ]
            [ header model ]
        , Grid.row []
            [ Grid.col []
                [ memoList model ]
            , Grid.col []
                [ randomGenerator model
                , gifGenerator model
                ]
            ]
        , footer model
        ]
