module Models.LoadingStatus exposing (LoadingVisibility(..), toCssProperties)


type LoadingVisibility
    = Visible
    | Gone


toCssProperties : LoadingVisibility -> String
toCssProperties status =
    case status of
        Visible ->
            "visible"

        Gone ->
            "hidden"
