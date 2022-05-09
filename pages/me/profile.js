import React, { useState, useEffect } from 'react'
import { ProfileContent } from '../../components/views';
import { useUserContext } from '../../context/user';
import { autoLogin } from '../../helpers/auto-login'

function Profile({ UserData }) {
    const { User, setUser } = useUserContext();

    useEffect(() => {
        if (!User && UserData) {
            setUser(UserData);
        }
    }, [User, setUser, UserData]);
    return (
        <div className="w-2/3 mx-auto bg-gray-50 shadow-sm">
            <ProfileContent id={UserData.data._id} token={UserData.token}/>
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

export default Profile