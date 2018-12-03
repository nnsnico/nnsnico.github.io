module Views.View exposing (view)

import Css exposing (..)
import Css.Global as Global
import Html.Styled as Html exposing (..)
import Html.Styled.Attributes exposing (..)
import Html.Styled.Events exposing (..)
import Models.LoadingStatus exposing (..)
import Models.Model exposing (..)
import Msgs exposing (..)
import Styles exposing (..)
import Time



-- View


globalStyleNode : Html msg
globalStyleNode =
    Global.global
        [ Global.everything
            [ margin (px 0) ]
        , Global.body
            [ minWidth (px 1024) ]
        ]


page : List (Attribute msg) -> List (Html msg) -> Html msg
page attributes children =
    styled div
        []
        attributes
        (globalStyleNode :: children)


listContent : List String -> List (Html msg)
listContent names =
    names
        |> List.map (\l -> li [] [ text l ])


formatTime : Int -> String
formatTime time =
    let
        timeLength =
            String.fromInt time |> String.length
    in
    {--1桁(0も含む)なら0挿入--}
    if timeLength == 1 then
        String.fromInt time |> String.append "0"

    else
        String.fromInt time


timeContent : Int -> Int -> Int -> String
timeContent hour minute second =
    let
        hourStr =
            formatTime hour

        minuteStr =
            formatTime minute

        secondStr =
            formatTime second
    in
    hourStr ++ ":" ++ minuteStr ++ ":" ++ secondStr


view : Model -> Html Msg
view model =
    let
        hour =
            Time.toHour model.zone model.time

        minute =
            Time.toMinute model.zone model.time

        second =
            Time.toSecond model.zone model.time
    in
    page []
        [ div [ css [ headerBar ] ]
            [ div [ css [ headerInnerLeft ] ]
                [ h1 [ css [ headerLabel ] ] [ div [] [ text "えるむの勉強" ] ]
                , h4 [ css [ descriptionLabel ] ] [ div [] [ text "にゅうりょくふぉ〜むになんか入力してEnterしたら追加されるよぉ" ] ]
                , h4 [ css [ descriptionLabel ] ] [ div [] [ text "ランダム数生成ボタンをおすとランダムに数字が出るよぉ" ] ]
                ]
            , div [ css [ headerInnerRight ] ]
                [ div [ css [ descriptionLabel ] ] [ text (timeContent hour minute second) ]
                ]
            ]
        , div [ css [ contentStyle ] ]
            [ div []
                [ div [ css [ leftContentStyle ] ]
                    [ div []
                        [ Html.form
                            [ method "post"
                            , onSubmit <| Update model.inputText
                            ]
                            [ label [ css [ labelStyle ] ]
                                [ text "にゅうりょくふぉ〜む(空文字だと追加されないよ)"
                                , br [] []
                                , input
                                    [ type_ "text"
                                    , placeholder "なんか書いとけ"
                                    , value <| Maybe.withDefault "" model.inputText
                                    , onInput InputText
                                    ]
                                    []
                                ]
                            , button [] [ text "追加" ]
                            ]
                        , ul [] (listContent model.names)
                        ]
                    ]
                , div [ css [ rightContentStyle ] ]
                    [ div []
                        [ label [ css [ labelStyle ] ]
                            [ text "ランダムに1〜100の数字をだすよぉ" ]
                        , div []
                            [ text (String.fromInt model.diceFace)
                            ]
                        , button [ onClick Roll ] [ text "生成" ]
                        ]
                    , div
                        [ css [ marginTop (px 8) ] ]
                        [ label [ css [ labelStyle ] ]
                            [ text "ランダムに画像を取得するよぉ" ]
                        , div [ css [ marginTop (px 8) ] ]
                            [ img [ src model.url, css [ maxWidth (px 500) ] ] []
                            ]
                        , div [ css [ displayFlex, alignItems center ] ]
                            [ button [ onClick MakeGif ] [ text "GIF生成" ]
                            , span [ css [ statusLabel ] ] [ text model.statusMessage ]
                            , div
                                [ class "spinner"
                                , css
                                    [ loadingVisibility <|
                                        if model.loadingStatus == Visible then
                                            "visible"

                                        else
                                            "hidden"
                                    ]
                                ]
                                [ div [ class "rect1" ] []
                                , div [ class "rect2" ] []
                                , div [ class "rect3" ] []
                                , div [ class "rect4" ] []
                                , div [ class "rect1" ] []
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
