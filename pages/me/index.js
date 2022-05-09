import React, { useState, useEffect } from 'react'
import { autoLogin } from '../../helpers/auto-login';
import { useUserContext } from '../../context/user';
import { Posts, Friends } from '../../components/views'
import { get } from '../../requests/get';
import { sortDate } from '../../helpers/sort-date';
import { Loader } from '../../components/parts';

function Home({ UserData }) {

    const { User, setUser, posts, setPosts } = useUserContext();
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        if (!User && UserData) {
            setUser(UserData);
        }
    }, [User, setUser, UserData]);

    useEffect(() => {
        const fetchData = async () => {
            // get the data from the api
            const response = await get('post', UserData.token);

            const authors = response.data.authors;
            const allPosts = response.data.posts;

            const friendResponse = await get(`users/${UserData.data._id}`, UserData.token);
            setFriends(friendResponse.data.friends);

            let filteredPosts = allPosts.filter(post => UserData.data.friends.includes(post.author) || authors.includes(post.author));
            filteredPosts = sortDate(filteredPosts)
            setPosts(filteredPosts);
        }
        fetchData();

        // set state with the result
    }, []);

    return (
        User && <div className="flex w-full ">
            <div className=" w-2/3">
                <Posts posts={posts} canCreate={true} />
            </div>
            {friends ?
                <Friends friends={friends} />
                :
                <div className='w-1/3 mt-12 mx-auto'>
                    <Loader />
                </div>}
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const response = await autoLogin(ctx)
    return {
        props: {
            UserData: response.UserData
        }

    }
}

export default Home