import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;

}

const Input: React.FC<IInputProps> = ({label, name, ...res}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...res} />
        </div>
    )
}

export default Input