import React from 'react';
import Link from 'next/link';

function Friend({ friend }) {
    return (
        <Link href={`/me/friends/${friend._id}`} >
            <a className="flex gap-4 items-center bg-gray-50 rounded-md min-w-[270px] max-w-[270px] mt-4 p-4">
                <div>
                    <img src={friend.image} alt={friend.name} className="w-12 h-12 min-w-[40px] min-h-[40px] rounded-full" />
                </div>
                <div className=" font-semibold">
                    {friend.name}
                </div>
           </a>
        </Link>
    )
}

export default Friend