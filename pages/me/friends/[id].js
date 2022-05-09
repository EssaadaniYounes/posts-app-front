import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Posts } from '../../../components/views'
import { UserInfo } from '../../../components/parts'
import { get } from '../../../requests/get';
import { autoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user'

function Friend({ UserData }) {
  const [friendPosts, setFriendPosts] = useState(null);
  const [friend, setFriend] = useState(null);
  const router = useRouter()
  const { id } = router.query;
  const { User, setUser } = useUserContext();
  useEffect(() => {
    if (!User && UserData) {
      setUser(UserData)
    }
    const fetchData = async () => {

      if (id) {
        const postsResponse = await get(`post/user/${id}`, UserData.token);
        const userResponse = await get(`users/${id}`, UserData.token);
        setFriendPosts(postsResponse.data);
        setFriend(userResponse.data);
      }
    };
    fetchData();
  }, [id]);
  return (
    friend &&
    <div className="flex w-full">
      <div className="w-2/3 mx-auto">
        <Posts posts={friendPosts} canCreate={false}>
          <UserInfo user={friend.user} friends={friend.friends} />
        </Posts>
      </div>
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
export default Friend