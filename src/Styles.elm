module Styles exposing
    ( contentStyle
    , descriptionLabel
    , headerBar
    , headerInnerLeft
    , headerInnerRight
    , headerLabel
    , labelStyle
    , leftContentStyle
    , loadingVisibility
    , rightContentStyle
    , statusLabel
    )

import Css exposing (..)



-- Styles


headerBar : Style
headerBar =
    Css.batch
        [ top (px 0)
        , left (px 0)
        , backgroundColor (rgb 90 198 243)
        , zIndex (int 9999)
        , padding (px 16)
        , position relative
        ]


headerInnerLeft : Style
headerInnerLeft =
    Css.batch
        [ display inlineBlock
        ]


headerInnerRight : Style
headerInnerRight =
    Css.batch
        [ display inlineBlock
        , float right
        ]


headerLabel : Style
headerLabel =
    Css.batch
        [ color (hex "ffffff")
        ]


descriptionLabel : Style
descriptionLabel =
    Css.batch
        [ color (hex "ffffff")
        ]


contentStyle : Style
contentStyle =
    Css.batch
        [ zIndex (int 1)
        , margin (px 8)
        ]


labelStyle : Style
labelStyle =
    Css.batch
        [ fontSize (px 16)
        , fontWeight bold
        ]


statusLabel : Style
statusLabel =
    Css.batch
        [ color (rgb 255 0 0)
        , margin (px 8)
        ]


leftContentStyle : Style
leftContentStyle =
    Css.batch
        [ float left
        , width (pct 50)
        ]


rightContentStyle : Style
rightContentStyle =
    Css.batch
        [ float right
        , width (pct 50)
        ]


loadingVisibility : String -> Style
loadingVisibility v =
    Css.batch
        [ property "visibility" v ]
