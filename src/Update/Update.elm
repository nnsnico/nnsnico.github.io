module Update.Update exposing (update)

import Api.HttpConnection as HttpConnection
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Models.Model exposing (Model, model)
import Msgs exposing (..)
import Random
import Time
import Update.UpdateGif exposing (..)
import Update.UpdateInput exposing (..)



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NavbarMsg state ->
            ( { model | navbarState = state }
            , Cmd.none
            )

        NoOp ->
            ( model
            , Cmd.none
            )

        Names names ->
            ( { model | names = names }
            , Cmd.none
            )

        InputText newInput ->
            ( { model | inputText = Just newInput }
            , Cmd.none
            )

        InputTopic newInput ->
            ( { model | topic = Just newInput }
            , Cmd.none
            )

        Update newInput ->
            updateInput newInput model

        Roll ->
            ( model
            , Random.generate NewFace (Random.int 1 100)
            )

        NewFace newFace ->
            ( { model | diceFace = newFace }
            , Cmd.none
            )

        Tick newTime ->
            ( { model | time = newTime }
            , Cmd.none
            )

        AdjustTimeZone newZone ->
            ( { model | zone = newZone }
            , Cmd.none
            )

        MakeGif newTopic ->
            updateGifTopic newTopic model

        NewGif result ->
            loadGif result model
