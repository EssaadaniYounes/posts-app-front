import React from 'react'

function InputsContainer(props) {
    return (
        <div className="px-4 flex flex-col gap-4">
            {props.children}
        </div>
    )
}

export default InputsContainer