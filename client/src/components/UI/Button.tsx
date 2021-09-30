import React from 'react';

interface Button {
    children: any
    onClick: () => void
}

const Button = (props: Button) => {
    
    return((
        <button onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault()
            props.onClick()
        }}>
            {props.children}
        </button>
    ))
}

export default Button;