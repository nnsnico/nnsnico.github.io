module Views.RandomGenerator exposing (randomGenerator)

import Html exposing (Html, button, div, label, text)
import Html.Events exposing (onClick)
import Models.Model exposing (Model)
import Msgs exposing (Msg(..))


randomGenerator : Model -> Html Msg
randomGenerator model =
    div []
        [ label []
            [ text "ランダムに1〜100の数字をだすよぉ" ]
        , div []
            [ text (String.fromInt model.diceFace) ]
        , button [ onClick Roll ] [ text "生成" ]
        ]
