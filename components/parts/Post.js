import React, { useState, useEffect } from 'react'
import PostDescription from './PostDescription'
import { patch } from '../../requests/patch';
import { useUserContext } from '../../context/user';
function Post({ post }) {
    const { User } = useUserContext();
    const [isLiked, setIsLiked] = useState(false);

    const updateLikes = async () => {
        setIsLiked(!isLiked)
        isLiked ? post.likes++ : post.likes > 0 ? post.likes-- : '';
        const payload = {
            "title": post.title,
            "description": post.description,
            "thumbnail": post.thumbnail,
            "likes": post.likes,
            "publishDate": post.publishDate,
            "author": post.author,
            "categories": post.categories
        }

        const id = post._id;
        const response = await patch(`post/${id}`, payload, User.token);
        post = response.data;
    }

    return (
        <div className="flex flex-col gap-4 rounded-md overflow-hidden relative bg-white my-4">
            <div className="w-full  top-0">
                <img src={post.thumbnail} alt={post.title} className="min-w-full h-[300px]" />
            </div>
            <div className="w-full px-3">
                <h1 className="text-2xl w-fit mb-2 mx-auto font-bold text-gray-800">{post.title}</h1>
                <PostDescription description={post.description} />
                <div className="flex mr-8 mt-4 justify-end gap-3 font-semibold">
                    {post.categories.map((category, i) => {
                        return <p key={category + i} className="cursor-pointer duration-150 hover:text-gray-500">#{category}</p>
                    })}
                </div>
                <div className="flex justify-between px-6 py-3">
                    <p className='text-sm flex items-center gap-2'>
                        <span>
                            <svg onClick={() => updateLikes()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </span>
                        {post.likes}
                        <span className="text-base font-semibold text-gray-600">Like</span>
                    </p>
                    <p>published at <span className='text-sm'>{post.publishDate}</span></p>
                </div>

            </div>
        </div>
    )
}

export default Post