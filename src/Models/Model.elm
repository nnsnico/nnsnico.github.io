module Models.Model exposing (Model, model)

import Api.HttpConnection as HttpConnection
import Bootstrap.Navbar as Navbar
import Css exposing (..)
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Msgs exposing (..)
import Task
import Time



-- Model


type alias Model =
    { navbarState : Navbar.State
    , names : List String
    , inputText : Maybe String
    , diceFace : Int
    , zone : Time.Zone
    , time : Time.Posix
    , topic : Maybe String
    , url : String
    , statusMessage : String
    , loadingStatus : LoadingVisibility
    }


model : () -> ( Model, Cmd Msg )
model _ =
    let
        ( navbarState, navbarCmd ) =
            Navbar.initialState NavbarMsg
    in
    ( { navbarState = navbarState
      , names =
            [ "hogehoge"
            , "fugafuga"
            , "piyopiyo"
            , "unkounko"
            ]
      , inputText = Nothing
      , diceFace = 1
      , zone = Time.utc
      , time = Time.millisToPosix 0
      , topic = Just "otaku"
      , url = "waiting.gif"
      , statusMessage = ""
      , loadingStatus = Gone
      }
    , Cmd.batch [ HttpConnection.getRandomGif "otaku", Task.perform AdjustTimeZone Time.here, navbarCmd ]
    )
