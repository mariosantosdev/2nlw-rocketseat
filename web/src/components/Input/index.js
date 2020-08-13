import React from 'react'

import {
    Form
} from 'react-bootstrap'

import './styles.css'

export default function InputComponent(props) {
    return (
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control {...props} />
        </Form.Group>
    )
}