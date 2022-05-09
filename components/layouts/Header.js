import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '../../context/user.js'

//css classes
const classes = {
    header: 'flex items-center w-full shadow-md py-4 px-8 z-10 relative',
    link: 'text-xl font-semibold text-blue-400',
    ul: 'flex flex-1 justify-end w-full pr-8 gap-3',
    li: 'font-medium duration-200 hover:text-gray-600 cursor-pointer hover:border-b',
}

function Header() {
    const { User, setUser } = useUserContext();
    const router = useRouter();
    const logout = () => {
        setUser(null);
        router.push('/auth');
    }
    useEffect(() => {
        return () => {
            setUser(undefined);
        }
    }, [])
    return (
        User && <div className={classes.header}>
            <Link href='/me'>
                <a className={classes.link}>Facebook-Clone 🤡</a>
            </Link>
            <ul className='flex justify-between items-center flex-1'>
                <li className='mx-16 rounded-full w-12 h-12 flex overflow-hidden cursor-pointer shadow-md'>
                    <Link href='/me/profile'>
                        <img src={`${User.data?.image}`} className='w-full h-full max-w-full max-h-full' alt="" />
                    </Link>
                </li>
                <li>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Link href='/me'>
                                <a className=''>Home</a>
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link href='/me/people'>
                                <a className=''>People</a>
                            </Link>
                        </li>
                        <li className={classes.li} onClick={() => logout()}>
                            Logout
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Header