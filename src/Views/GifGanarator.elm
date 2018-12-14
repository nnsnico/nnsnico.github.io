module Views.GifGanarator exposing (gifGenerator)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Progress as Progress
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.LoadingStatus exposing (..)
import Models.Model exposing (..)
import Msgs exposing (Msg(..))


gifGenerator : Model -> Html Msg
gifGenerator model =
    div [ style "margin-top" "8px" ]
        [ label []
            [ text "ランダムに画像を取得するよぉ"
            , div [ style "margin-top" "8px" ]
                [ img [ src model.url, style "max-width" "500px" ] [] ]
            , div [ style "margin" "8px 0" ]
                [ div
                    [ style "display" "flex"
                    , style "align-items" "center"
                    ]
                    [ button
                        [ style "margin-right" "4px"
                        , onClick MakeGif
                        ]
                        [ text "GIF生成" ]
                    , Progress.progress
                        [ Progress.value 100
                        , Progress.animated
                        , Progress.attrs
                            [ style "width" "8rem"
                            , style "visibility" <|
                                if model.loadingStatus == Visible then
                                    "visible"

                                else
                                    "hidden"
                            ]
                        ]
                    ]
                ]
            , div
                [ style "margin" "0 8px"
                , style "color" "red"
                ]
                [ text model.statusMessage ]
            ]
        ]
