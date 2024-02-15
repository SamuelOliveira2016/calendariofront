import React from "react";

export default ({titulo}) => {

    let css = {
        fontSize: "2.5em",
        padding: "50px 0px",
        color: "#fff"
    }

    return  <h1 style={css}>{titulo}</h1>
}