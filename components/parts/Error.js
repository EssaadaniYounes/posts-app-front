import React from 'react'

function Error({ error }) {
    return (
        <p className='ml-2 text-red-600 font-semibold animate-[zoom_.8s_ease]'>{error}</p>
    )
}

export default Error