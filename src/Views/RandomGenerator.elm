module Views.RandomGenerator exposing (randomGenerator)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
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
