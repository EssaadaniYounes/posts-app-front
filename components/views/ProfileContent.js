import React, { useState, useEffect } from 'react'
import { get } from '../../requests/get';
import { useUserContext } from '../../context/user';
import Posts from './Posts';
import { UserInfo } from '../parts';
import { sortDate } from '../../helpers/sort-date';
function ProfileContent({ id, token}) {
    const [userPosts, setUserPosts] = useState(null);
    const [friends, setFriends] = useState(null);
    const [user, setUser] = useState(null);
    const { User } = useUserContext();
    useEffect(() => {
        const fetchData = async () => {
            const response = await get(`post/user/${id}`, token);
            const friendResponse = await get(`users/${id}`, token);
            const data = await response.data;
            setUser(friendResponse.data.user)
            setUserPosts(sortDate(data));
            setFriends(friendResponse.data.friends)
        }
        fetchData();
    }, [id]);
    return (
        userPosts && <Posts posts={userPosts} canCreate={true}>
            <UserInfo user={user} friends={friends} />
        </Posts>
    )
}

export default ProfileContent