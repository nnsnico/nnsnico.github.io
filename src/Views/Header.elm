module Views.Header exposing (header)

import Bootstrap.Navbar as Navbar
import Color exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
import Msgs exposing (..)


header : Model -> Html Msg
header model =
    Navbar.config NavbarMsg
        |> Navbar.attrs [ style "max-width" "100%" ]
        |> Navbar.withAnimation
        |> Navbar.container
        |> Navbar.fixTop
        |> Navbar.darkCustom (rgb255 255 125 17)
        |> Navbar.brand [ href "#" ] [ text "Hoge" ]
        |> Navbar.view model.navbarState
