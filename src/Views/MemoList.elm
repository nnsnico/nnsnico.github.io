module Views.MemoList exposing (memoList)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Models.Model exposing (..)
import Msgs exposing (Msg(..))


listContent : List String -> List (Html msg)
listContent names =
    names
        |> List.map (\l -> li [] [ text l ])


memoList : Model -> Html Msg
memoList model =
    div []
        [ Html.form
            [ method "post"
            , onSubmit <| Update model.inputText
            ]
            [ label []
                [ text "にゅーりょくふぉーむ"
                , br [] []
                , input
                    [ type_ "text"
                    , placeholder "なんかかいとけ"
                    , value <| Maybe.withDefault "" model.inputText
                    , onInput InputText
                    ]
                    []
                ]
            , button [] [ text "追加" ]
            ]
        , ul [] (listContent model.names)
        ]
