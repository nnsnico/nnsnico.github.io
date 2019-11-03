module Views.GifGanarator exposing (gifGenerator)

import Bootstrap.Progress as Progress
import Html exposing (Html, br, button, div, img, input, label, text)
import Html.Attributes exposing (placeholder, src, style, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import Models.LoadingStatus exposing (LoadingVisibility(..))
import Models.Model exposing (Model)
import Msgs exposing (Msg(..))


gifGenerator : Model -> Html Msg
gifGenerator model =
    div [ style "margin-top" "8px" ]
        [ label []
            [ div []
                [ Html.form
                    [ onSubmit <| MakeGif model.topic ]
                    [ label []
                        [ text "↓のにゅうりょくふぉーむで画像を検索するよぉ"
                        , br [] []
                        , input
                            [ type_ "text"
                            , placeholder "キーワードをにゅーりょく"
                            , value <| Maybe.withDefault "" model.topic
                            , onInput <| InputTopic
                            , style "min-width" "16rem"
                            ]
                            []
                        ]
                    ]
                ]
            , div [ style "margin-top" "8px" ]
                [ img [ src model.url, style "max-width" "500px" ] [] ]
            , div [ style "margin" "8px 0" ]
                [ div
                    [ style "display" "flex"
                    , style "align-items" "center"
                    ]
                    [ button
                        [ style "margin-right" "4px"
                        , onClick <| MakeGif <| model.topic
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
