module Main exposing (main)

import Bootstrap.Navbar as Navbar
import Browser
import Models.Model exposing (..)
import Msgs exposing (..)
import Time
import Update.Update exposing (..)
import Views.MainView exposing (..)


main =
    Browser.element
        { init = model
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every 1000 Tick
        , Navbar.subscriptions model.navbarState NavbarMsg
        ]
