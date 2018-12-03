module Msgs exposing (Msg(..))

import Http
import Time


type Msg
    = Names (List String)
    | InputText String
    | Update (Maybe String)
    | Roll
    | NewFace Int
    | Tick Time.Posix
    | AdjustTimeZone Time.Zone
    | MakeGif
    | NewGif (Result Http.Error String)
    | NoOp
