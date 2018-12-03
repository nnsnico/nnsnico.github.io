module Update.UpdateGif exposing (updateGif)

import Http
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Models.Model exposing (..)
import Msgs exposing (..)


updateGif : Result Http.Error String -> Model -> ( Model, Cmd Msg )
updateGif s model =
    case s of
        Ok newUrl ->
            ( { model | url = newUrl, statusMessage = "", loadingStatus = Gone }
            , Cmd.none
            )

        Err _ ->
            ( { model | statusMessage = "サーバーの接続に失敗しました！", loadingStatus = Gone }
            , Cmd.none
            )
