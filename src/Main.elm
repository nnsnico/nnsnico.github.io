module Main exposing (main)

import Browser
import Html.Styled exposing (toUnstyled)
import Models.Model exposing (..)
import Msgs exposing (..)
import Time
import Update.Update exposing (..)
import Views.View exposing (..)


main =
    Browser.element
        { init = model
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every 1000 Tick
