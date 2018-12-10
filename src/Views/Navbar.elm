module Views.Navbar exposing (navbar)

import Bootstrap.Navbar as Navbar
import Color exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
import Msgs exposing (..)


navbar : Model -> Html Msg
navbar model =
    Navbar.config NavbarMsg
        |> Navbar.attrs [ style "max-width" "100%" ]
        |> Navbar.withAnimation
        |> Navbar.container
        |> Navbar.darkCustom (rgb255 255 125 17)
        |> Navbar.brand [ href "#" ] [ text "Elmのべんきょー" ]
        |> Navbar.items [ Navbar.itemLink [ href "https://github.com/nnsnico" ] [ text "About me (@Github)" ] ]
        |> Navbar.view model.navbarState
