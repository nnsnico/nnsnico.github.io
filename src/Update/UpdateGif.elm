module Update.UpdateGif exposing (loadGif, updateGifTopic)

import Api.HttpConnection as HttpConnection
import Http
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Models.Model exposing (..)
import Msgs exposing (..)


updateGifTopic : Maybe String -> Model -> ( Model, Cmd Msg )
updateGifTopic s model =
    case s of
        Just input ->
            if String.trim input /= "" then
                ( { model | loadingStatus = Visible, topic = Just input }
                , HttpConnection.getRandomGif input
                )

            else
                ( model
                , Cmd.none
                )

        Nothing ->
            ( model
            , Cmd.none
            )


loadGif : Result Http.Error String -> Model -> ( Model, Cmd Msg )
loadGif s model =
    case s of
        Ok newUrl ->
            ( { model | url = newUrl, statusMessage = "", loadingStatus = Gone }
            , Cmd.none
            )

        Err _ ->
            ( { model | statusMessage = "サーバーの接続に失敗しました！", loadingStatus = Gone }
            , Cmd.none
            )
