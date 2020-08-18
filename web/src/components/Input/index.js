import React from 'react'


import './styles.css'

export default function InputComponent(props) {
    return (
        <div className={`input-block ${props.column && 'column-input'}`} >
            <label htmlFor={props.name}>{props.label}</label>
            <input type="text" id={props.name} {...props} />
        </div>
    )
}