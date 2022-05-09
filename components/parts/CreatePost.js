import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'

import { useUserContext } from '../../context/user';
import { post } from '../../requests/post';
function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [categories, setCategories] = useState('');
    const { User, setPosts, posts } = useUserContext();
    const createPost = async () => {
        const thumbnailForm = new FormData();
        thumbnailForm.append('thumbnail', thumbnail);

        let res = null;
        if (thumbnail) res = await post('image/thumb', thumbnailForm);
        const payload = {
            title: title,
            description: description,
            thumbnail: res?.data || null,
            likes: 0,
            publishDate: new Date(),
            author: User.data._id,
            categories: categories.split(','),
        };
        const response = await post('post', payload, User.token);
        if (response.status === 400) return toast.notify(response.data, {
            duration: 5,
            type: "error"
        })

        setPosts([response.data, ...posts]);
        toast.notify('Post added successfully 😬', {
            duration: 2,
            type: "success"
        })
        
    }
    return (
        <div>
            <ToastContainer />

            <div className="bg-white shadow-md rounded-md flex flex-col relative items-center p-4 gap-4">

                <img src={`${User.data?.image}`} className="w-12 h-12 rounded-full absolute left-4" alt="" />
                <input type="text"
                    className="mt-14 rounded-md w-full text-gray-700 shadow-sm border outline-none p-2"
                    placeholder="Title"
                    onChange={e => setTitle(e.target.value)} />

                <textarea className="rounded-md w-full h-20 text-gray-700 shadow-sm border outline-none p-2"
                    placeholder={`What's on your mind...,`}
                    onChange={e => setDescription(e.target.value)} />

                <div className=" w-full">
                    <div className="mb-3">
                        <label htmlFor="formFileLg" className="form-label inline-block mb-2 text-gray-700">Post thumbnail</label>
                        <input className="form-control cursor-pointer block w-full px-2 py-1.5 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="file"
                            onChange={e => { setThumbnail(e.target.files[0]) }} />
                    </div>
                </div>

                <input type="text"
                    className="rounded-md w-full text-gray-700 shadow-sm border outline-none p-2"
                    placeholder="Categories..."
                    onChange={e => setCategories(e.target.value)} />
                <button className='w-40 bg-blue-500 py-2 rounded-md text-xl text-white font-semibold duration-150 hover:bg-blue-700' onClick={() => createPost()}>Create post</button>
            </div>
        </div>

    )
}

export default CreatePost