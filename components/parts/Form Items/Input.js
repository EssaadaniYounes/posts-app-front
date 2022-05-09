import React, { useState, useEffect } from 'react';

function Input(props) {
    const [inputValue, setInputValue] = useState(null);
    
    useEffect(() => {
        setInputValue(props.inputValue);
    }, [props.inputValue]);

    return (
        <div className="input w-full flex my-4">
            <label className='text-lg mr-3 w-1/5'>{props.label}:</label>
            <input
                type={props.inputType}
                value={inputValue ? inputValue : ''}
                onKeyUp={props.handleKeyUp}
                onChange={(e) => { setInputValue(e.target.value) }}
                placeholder={props.label + "..."}
                className=' outline-none pt-1 pl-2 text-base flex-1 bg-transparent -mt-1 border-b border-black' />
        </div>
    )
}

export default Input