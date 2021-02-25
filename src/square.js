import React from 'react';

export function square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        
        
        </button>
        
        
        );
}