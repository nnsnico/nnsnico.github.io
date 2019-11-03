module Main exposing (main)

import Bootstrap.Navbar as Navbar
import Browser
import Models.Model exposing (Model, model)
import Msgs exposing (Msg(..))
import Time
import Update.Update exposing (update)
import Views.MainView exposing (view)


main : Program () Model Msg
main =
    Browser.document
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
