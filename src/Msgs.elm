module Msgs exposing (Msg(..))

import Bootstrap.Navbar as Navbar
import Http
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Time


type Msg
    = NavbarMsg Navbar.State
    | Names (List String)
    | InputText String
    | InputTopic String
    | Update (Maybe String)
    | Roll
    | NewFace Int
    | Tick Time.Posix
    | AdjustTimeZone Time.Zone
    | MakeGif (Maybe String)
    | NewGif (Result Http.Error String)
    | NoOp
