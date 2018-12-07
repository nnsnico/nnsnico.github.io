module Views.GifGanarator exposing (gifGenerator)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
import Msgs exposing (Msg(..))


gifGenerator : Model -> Html Msg
gifGenerator model =
    div [ style "margin-top" "8px" ]
        [ label []
            [ text "ランダムに画像を取得するよぉ"
            , div [ style "margin-top" "8px" ]
                [ img [ src model.url, style "max-width" "500px" ] [] ]
            , div
                [ style "display-flex" "1"
                , style "align-items" "center"
                , style "margin-top" "8px"
                ]
                [ button [ onClick MakeGif ] [ text "GIF生成" ]
                , span [] [ text model.statusMessage ]
                , div [] []
                ]
            ]
        ]
