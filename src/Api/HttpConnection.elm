module Api.HttpConnection exposing (getRandomGif, gifDecoder, toGiphyUrl)

import Http
import Json.Decode as Decode
import Msgs exposing (..)
import Url.Builder as Url


{-| Http.getでgetリクエストの作成、Http.sendでリクエストの送信
-}
getRandomGif : String -> Cmd Msg
getRandomGif topic =
    Http.get (toGiphyUrl topic) gifDecoder
        |> Http.send NewGif


{-| Url.crossOrigin
第1引数でパス階層をListで
第2引数でgetパラメータの設定
-}
toGiphyUrl : String -> String
toGiphyUrl topic =
    Url.crossOrigin "https://api.giphy.com"
        [ "v1", "gifs", "random" ]
        [ Url.string "api_key" "JpiwROvYjfwJyJfANQvWVHlSzvSpWvmY"
        , Url.string "tag" topic
        ]


{-| Jsonオブジェクトの中にある`data`パラメータ内の`image_url`パラメータを取得
-}
gifDecoder : Decode.Decoder String
gifDecoder =
    Decode.field "image_url" Decode.string
        |> Decode.field "data"
