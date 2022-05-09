import React, { useState, useEffect } from 'react';
import { autoLogin } from '../../helpers/auto-login';
import { useUserContext } from '../../context/user';
import { get } from '../../requests/get';
import { Friend, Loader } from '../../components/parts';

function people({ UserData }) {
  const { User, setUser } = useUserContext();
  const [people, setPeople] = useState(null);
  useEffect(() => {
    if (!User && UserData) {
      setUser(UserData);
    }
    const fetchData = async () => {
      const response = await get('users/people/profiles', UserData.token);
      setPeople(response.data);
    }
    fetchData();
  }, [])
  console.log(people)
  return (
    <div className="flex h-screen">
      <div className="shadow-md w-1/3 min-h-full max-h-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 overflow-y-scroll">
        {
          people ?
            people.map(user => <div key={user._id} className="w-fit mx-auto"><Friend friend={user} /></div>)
            : <Loader />
        }
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
export default people