import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;

}

const TextArea: React.FC<ITextAreaProps> = ({label, name, ...res}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...res} />
        </div>
    )
}

export default TextArea