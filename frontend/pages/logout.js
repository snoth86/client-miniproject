import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import { useRouter } from 'next/router'
export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])
    const router = useRouter()
    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
        router.push('/')
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className='h-screen'>
                <Navbar />
                <div className='h-full flex justify-center items-center bg-tri p-3'>
                    <div>
                    <h1>Logout</h1>
                <div>
                    <h2> {status}  </h2>
                </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
