module Models.Model exposing (Model, model)

import Api.HttpConnection as HttpConnection
import Css exposing (..)
import Msgs exposing (..)
import Task
import Time



-- Model


type alias Model =
    { names : List String
    , inputText : Maybe String
    , diceFace : Int
    , zone : Time.Zone
    , time : Time.Posix
    , topic : String
    , url : String
    , statusMessage : String
    , loadingStatus : String
    }


model : () -> ( Model, Cmd Msg )
model _ =
    ( Model
        [ "hogehoge"
        , "fugafuga"
        , "piyopiyo"
        ]
        Nothing
        1
        Time.utc
        (Time.millisToPosix 0)
        "otaku"
        "waiting.gif"
        ""
        "hidden"
    , Cmd.batch [ HttpConnection.getRandomGif "otaku", Task.perform AdjustTimeZone Time.here ]
    )
