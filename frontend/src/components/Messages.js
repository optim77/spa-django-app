import React from 'react'

export default function Messages(props){
    return (
        <div id="messages" hidden={props.hidden} className="messages"><p>{props.message} </p></div>
    )
}