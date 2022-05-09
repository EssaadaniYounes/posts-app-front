import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'
import Friend from './Friend'
import { useUserContext } from '../../context/user';
import { post } from '../../requests/post';

function UserInfo({ user, friends = null, canAddRemove = true }) {
    const { User } = useUserContext();
    const [isFriend, setIsFriend] = useState(User.data.friends.includes(user._id));
    const handleOnClick = async () => {
        let response;
        if (isFriend) {
            response = await post('users/people/remove', { friend: user._id }, User.token);
            setIsFriend(false)
        }
        if (!isFriend) {
            response = await post('users/people/add', { newFriend: user._id }, User.token);
            setIsFriend(true)
        }
        toast.notify(response.data, {
            duration: 2,
            type: "success"
        })
    };
    useEffect(() => {
        setIsFriend(User.data.friends.includes(user._id))
    }, [user])
    return (
        <div>
            <ToastContainer />
            <div className='flex h-[128px] my-4 rounded-md overflow-hidden justify-between items-center bg-white '>
                <div>
                    <img src={user.image} alt="" />
                </div>
                <div className='text-left flex-1 ml-6 min-h-full py-2'>
                    <h1 className='text-xl font-semibold text-gray-900'>{user.name}</h1>
                    <span className='mt-2 block text-gray-600'>{user.email}</span>

                    {User.data._id != user._id && <button onClick={() => handleOnClick()} className='shadow-md flex mt-2 py-2 px-4 bg-blue-200 rounded-md text-gray-800 gap-1 duration-150 hover:bg-blue-400 hover:text-white'>
                        {!isFriend ?
                            < >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Friend
                            </> :
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                                </svg>
                                Friend
                            </>
                        }
                    </button>
                    }
                </div>
            </div>
            <div className='bg-white rounded-md'>
                <h1 className='block pt-4 ml-5 -mb-6 text-2xl border-b w-fit font-semibold text-gray-700'>Friends {friends.length > 0 && `(${friends.length})`}</h1>
                {friends.length ?
                    <div className='flex flex-wrap justify-start gap-x-16 my-4 p-4'>
                        {
                            friends.map((friend, i) => {
                                return i < 5 && <Friend friend={friend} key={i} />
                            })
                        }

                        <p className='block w-fit cursor-pointer mt-16'>Show More...</p>
                    </div>
                    :
                    <div className='text-xl font-semibold text-gray-600 my-4 p-4' >
                        No friend yet</div>
                }
            </div>
        </div>
    )
}

export default UserInfo