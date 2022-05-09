import { post } from "../requests/post"

export async function autoLogin(ctx) {
    if (ctx.req && ctx.req.cookies) {
        const email = ctx.req.cookies["email"]
        const password = ctx.req.cookies["password"]

        const payload = {
            email: email,
            password: password
        }

        const response = await post('user/login', payload);
        return {
            UserData: response.data
        }
    }
    else {
        return {
            UserData: 'none'
        }
    }
}