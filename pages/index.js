import { useRouter } from "next/router";
import { useEffect } from "react";

import { useUserContext } from "../context/user";

import { autoLogin } from "../helpers/auto-login";
import { post } from "../requests/post";

function Index({ User }) {
    const { setUser } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        setUser(User);

        User ? router.push('/me') : router.push('/auth');

    }, [User, setUser])

    return (
        <div></div>
    )
}
export const getServerSideProps = async (ctx) => {
    const email = ctx.req.cookies["email"];
    const password = ctx.req.cookies["password"];

    const response = await post('user/login', { email: email, password: password });
    return {
        props: {
            User: response.data != undefined ? response.data : null
        }
    }
}
export default Index