
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import { useRouter } from 'next/router'
export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState('')
    const [studentid, setStudentID] = useState('')

    const router = useRouter()
    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try{
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password,phone ,studentid})
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
            router.push('/')
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div className=''>
            <div className='text-fif'> 
                Username:
            </div>
            <div className='text-fif'>
                <input className='px-2' type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='text-fif'>
                Email:
            </div>
            <div className='text-fif'>
                <input className='px-2' type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='text-fif'>
                Password:
            </div>
            <div className='text-fif'>
                <input className='px-2' type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='text-fif'>
                Phone:
            </div>
            <div className='text-fif'>
                <input className='px-2' type="tels"
                    name="phone"
                    placeholder="phone"
                    onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className='text-fif'>
                StudentID:
            </div>
            <div className='text-fif'>
                <input className='px-2' type="text"
                    name="studentid"
                    placeholder="studentid"
                    onChange={(e) => setStudentID(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head> 
            <div className='h-screen'> 
            <Navbar links={token} />
                <div className='h-full flex justify-center bg-tri'>
                    <div className='bg-fur w-full z-10 max-w-5xl flex justify-center'>
                        <div className='mt-10 border rounded h-fit border-fif p-10'>
                            <h1 className='text-3xl font-bold text-center mb-10 text-fif'>Register</h1>
                            <div>
                                {registerForm()}
                            </div>
                            <div className='text-center mt-5'>
                                <button className='p-2 border border-fif text-fif hover:bg-fif hover:text-tri my-3 rounded px-5' onClick={register}>Register</button>
                            </div>
                        </div>
                    </div>
                    <img className='fixed left-0 bottom-0 z-0 w-1/6' src='https://media.baamboozle.com/uploads/images/210658/1629691942_44449_url.gif' />
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
