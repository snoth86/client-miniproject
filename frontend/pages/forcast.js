import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Forcast = ({ token }) => {

    const [user, setUser] = useState({})
    const [geocode, setGeocode] = useState({})
    const [province, setProvince] = useState({})
    const [weather, setWeather] = useState({})

    const opnweather_key = 'ac4d05000856b0a161b905c35b9d5e61';

    useEffect(() => {
        profileUser()
        forcastweather();
        getweather()
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
    const forcastweather = async () => {
        try {
            // console.log('token: ', token)
            const openweather = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=Phuket,TH&limit=1&appid=${opnweather_key}`).then(
                function(response){
                    console.log(response.data[0].lat)
                    console.log(response.data[0].lon)
                    console.log(response.data[0])
                    setGeocode(response.data[0])
                    try {
                        // console.log('token: ', token)
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${opnweather_key}&units=metric`).then(
                            function(response){
                                console.log(response.data)
                                setWeather(response.data)
                            }
                        )
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            )
        }
        catch (e) {
            console.log(e)
        }

    }

    const getweather = async () => {
        try {
            // console.log('token: ', token)
            const weatherdata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geocode[0].lat}&lon=${geocode[0].lon}&appid=${opnweather_key}`)
            console.log(weatherdata.data)
            setWeather(weatherdata.data)
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
            <div className={styles.container}>
                <Navbar />
                <h1>Weathere</h1>
                <div>
                   
                {JSON.stringify(geocode)}
                   {JSON.stringify(weather)}
                   
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Forcast)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
