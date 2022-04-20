import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import { useRouter } from 'next/router'
import iflogin from '../components/ifLogin'
import Link from 'next/link'

const Home = ({ token }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const router = useRouter()
    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
            router.push('/forcast')
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div className="my-4">
            
            <div>
                Username
            </div>
            <div>
                <input className='bg-tri px-2 text-fif' type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password
            </div>
            <div>
                <input className='bg-tri px-2 text-fif' type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className='h-screen'>
            <Navbar links={token} />
                <div className='h-full flex justify-center items-center bg-tri p-3'>
                  <div className='bg-pri p-2 rounded w-4/12 z-10'>
                    <div className='bg-sec text-fur p-3 rounded flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold text-center py-3'>Login</h1>
                {loginForm()}
                <div className='text-center'>
                    <button className='p-2 bg-pri my-3 rounded px-5' onClick={login}>Login</button>
                </div>
                <div className='text-center'>
                    <p className='text-xs my-2'>Not a member</p>
                    <Link href="/register"><a className='border border-fur p-1 rounded px-5 text-fur hover:border-fif hover:bg-fif'> Register </a></Link>
                </div>
                    </div>
                  </div>
                </div>
                <img className='fixed right-0 top-0 z-0 w-1/6' src="https://i.pinimg.com/originals/2e/69/fc/2e69fc7655735baea3651154dfe8c2bc.gif"/>
            </div>
        </Layout>
    )
}

export default iflogin(Home)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
