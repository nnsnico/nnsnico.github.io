module Views.MainView exposing (view)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Browser exposing (Document)
import Color exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Models.Model exposing (..)
import Msgs exposing (..)
import Views.Footer exposing (footer)
import Views.GifGanarator exposing (gifGenerator)
import Views.Header exposing (header)
import Views.MemoList exposing (memoList)
import Views.Navbar exposing (navbar)
import Views.RandomGenerator exposing (randomGenerator)


view : Model -> Document Msg
view model =
    { title = "nnsnico"
    , body =
        [ navbar model
        , header model
        , Grid.container [ style "max-width" "100%" ]
            [ CDN.stylesheet
            , CDN.fontAwesome
            , Grid.row [ Row.attrs [ class "main-container" ] ]
                [ Grid.col []
                    [ memoList model ]
                , Grid.col []
                    [ randomGenerator model
                    , gifGenerator model
                    ]
                ]
            ]
        , footer model
        ]
    }
