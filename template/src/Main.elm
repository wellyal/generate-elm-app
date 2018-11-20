module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)



-- APP


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }



-- MODEL


type alias Model =
    Int


init : Model
init =
    0



-- UPDATE


type Msg
    = NoOp
    | Increment


update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model

        Increment ->
            model + 1



-- VIEW
-- Html is defined as: elem [ attribs ][ children ]
-- CSS can be applied via class names or inline style attrib


view : Model -> Html Msg
view model =
    div
        -- inline CSS (literal)
        [ style "margin-top" "30px"
        , style "text-align" "center"
        ]
        [ div []
            [ img
                [ src "assets/img/logo.png"
                , style "width" "33%"
                , style "border" "4px solid #337AB7"
                ]
                []
            , p [] [ text "Elm generator starter" ]

            -- click handler
            , button
                [ class "btn btn-primary btn-lg", onClick Increment ]
                [ span [] [ text "FTW!" ] ]
            ]
        ]
