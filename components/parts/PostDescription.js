import React, { useState, useEffect } from 'react'

function PostDescription({ description }) {
    const [splicedDescription, setSplicedDescription] = useState([]);
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
        const items = [];
        if (description) {
            items.push(description.substring(0, 80));
            items.push(description.substring(80));
        }
        setSplicedDescription(items);
    }, []);

    return (
        <div>
            <p>{splicedDescription[0]}
                {description.length > 50 && <span className={!showMore ? 'inline' : 'hidden'}>...</span>}
                <span className={showMore ? 'inline' : 'hidden'}>{splicedDescription[1]}</span>
            </p>

            {description.length > 50 && <button onClick={() => setShowMore(!showMore)} className='text-gray-600 font-semibold'>
                {!showMore ? 'Read more' : 'Show less'}
            </button>}
        </div>
    )
}

export default PostDescription