module Update.UpdateInput exposing (updateInput)

import Models.Model exposing (..)
import Msgs exposing (Msg(..))


updateInput : Maybe String -> Model -> ( Model, Cmd Msg )
updateInput s model =
    case s of
        Just input ->
            if String.trim input /= "" then
                ( { model | names = input :: model.names, inputText = Nothing }
                , Cmd.none
                )

            else
                ( { model | inputText = Nothing }
                , Cmd.none
                )

        Nothing ->
            ( model
            , Cmd.none
            )
