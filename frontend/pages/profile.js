import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className="bg-indigo-500;">
            <div className='h-screen'>
            <Navbar links={token} />
                <div className='h-full flex items-center flex-col bg-tri p-3'>
                <h1 className='text-3xl font-bold text-center text-fif my-3 py-3'>User profile</h1>
                  <div className='border-2 h-3/4 border-pri p-2 rounded w-4/12 z-10'>
                    <div className='bg-sec h-full text-fur p-5 rounded flex flex-col items-center'>
                <div className='w-full'>
                    <div className='w-full flex flex-col item-center justify-center'>
                        <p className='flex justify-center'>
                        <span className='w-4/12'>Email : </span>
                        <span>{user.email}</span>
                        </p>
                        <p className='flex justify-center'>
                        <span className='w-4/12'>Student ID : </span>
                        <span>
                        {user.studentid}
                        </span>
                        </p>
                        <p className='flex justify-center'>
                            <span className='w-4/12'>Tel : </span>
                            <span>{user.phone}</span>
                        </p>
                    
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
