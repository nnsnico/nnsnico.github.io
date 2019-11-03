module Views.Header exposing (header)

import Bootstrap.Grid as Grid
import Color exposing (rgb255, toCssString)
import Html exposing (Html, br, div, h1, p, text)
import Html.Attributes exposing (style)
import Models.Model exposing (Model)
import Msgs exposing (Msg(..))


header : Model -> Html Msg
header _ =
    div
        [ style "padding" "2rem 15px"
        , style "background-color" (Color.toCssString (rgb255 255 125 17))
        , style "margin-bottom" "1.5rem"
        ]
        [ Grid.container []
            [ Grid.row []
                [ Grid.col []
                    [ h1 [ style "color" "white" ]
                        [ text "発展途上の世界" ]
                    , p [ style "color" "white" ]
                        [ text "荒廃したコンポーネント"
                        , br [] []
                        , text "まだElmのDOMにはなれてません..."
                        ]
                    ]
                ]
            ]
        ]
