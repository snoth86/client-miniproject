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
    const [province, setProvince] = useState('Nonthaburi')
    const [weather, setWeather] = useState({"coord":{"lon":100.4911,"lat":13.843},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":26.52,"feels_like":26.52,"temp_min":24.45,"temp_max":28.34,"pressure":1011,"humidity":93},"visibility":8000,"wind":{"speed":3.09,"deg":320},"clouds":{"all":40},"dt":1650315361,"sys":{"type":2,"id":2037340,"country":"TH","sunrise":1650322950,"sunset":1650367894},"timezone":25200,"id":1608133,"name":"Nonthaburi","cod":200})

    const opnweather_key = 'ac4d05000856b0a161b905c35b9d5e61';

    useEffect(() => {
        profileUser()
        forcastweather('Nonthaburi');
        // getweather()
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
    const forcastweather = (provincee) => {
        try {
            // console.log('token: ', token)
            const openweather = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${provincee},TH&limit=1&appid=${opnweather_key}`).then(
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

    const getweather = () => {
        try {
            // console.log('token: ', token)
            const weatherdata = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geocode[0].lat}&lon=${geocode[0].lon}&appid=${opnweather_key}`)
            console.log(weatherdata.data)
            setWeather(weatherdata.data)
        }
        catch (e) {
            console.log(e)
        }
    }
    
    const ChangeProvince = (province) =>(
        setProvince(province)
    )
    const SelectProvince = () => (
        <div className='my-10 text-center text-fif'>
            <label className='mr-3'>select province:</label>
        <select className='px-5'
        value={province}
        onChange={(e) => {
            setProvince(e.target.value);
            console.log(province)
            forcastweather(e.target.value)
        }}
      >
  <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
  <option value="Chiang Mai">Chiang Mai</option>
  <option value="Kanchanaburi">Kanchanaburi</option>
  <option value="Tak">Tak</option>
  <option value="Ubon Ratchathani">Ubon Ratchathani</option>
  <option value="Surat Thani">Surat Thani</option>
  <option value="Chaiyaphum">Chaiyaphum</option>
  <option value="Mae Hong Son">Mae Hong Son</option>
  <option value="Phetchabun">Phetchabun</option>
  <option value="Lampang">Lampang</option>
  <option value="Udon Thani">Udon Thani</option>
  <option value="Chiang Rai">Chiang Rai</option>
  <option value="Nan">Nan</option>
  <option value="Loei">Loei</option>
  <option value="Khon Kaen">Khon Kaen</option>
  <option value="Phitsanulok">Phitsanulok</option>
  <option value="Buriram">Buriram</option>
  <option value="Nakhon Si Thammarat">Nakhon Si Thammarat</option>
  <option value="Sakon Nakhon">Sakon Nakhon</option>
  <option value="Nakhon Sawan">Nakhon Sawan</option>
  <option value="Sisaket">Sisaket</option>
  <option value="Kamphaeng Phet">Kamphaeng Phet</option>
  <option value="Roi Et">Roi Et</option>
  <option value="Surin">Surin</option>
  <option value="Uttaradit">Uttaradit</option>
  <option value="Songkhla">Songkhla</option>
  <option value="Sa Kaeo">Sa Kaeo</option>
  <option value="Kalasin">Kalasin</option>
  <option value="Uthai Thani">Uthai Thani</option>
  <option value="Sukhothai">Sukhothai</option>
  <option value="Phrae">Phrae</option>
  <option value="Prachuap Khiri Khan">Prachuap Khiri Khan</option>
  <option value="Chanthaburi">Chanthaburi</option>
  <option value="Phayao">Phayao</option>
  <option value="Phetchaburi">Phetchaburi</option>
  <option value="Lopburi">Lopburi</option>
  <option value="Chumphon">Chumphon</option>
  <option value="Nakhon Phanom">Nakhon Phanom</option>
  <option value="Suphanburi">Suphanburi</option>
  <option value="Chachoengsao">Chachoengsao</option>
  <option value="Maha Sarakham">Maha Sarakham</option>
  <option value="Ratchaburi">Ratchaburi</option>
  <option value="Trang">Trang</option>
  <option value="Prachinburi">Prachinburi</option>
  <option value="Krabi">Krabi</option>
  <option value="Phichit">Phichit</option>
  <option value="Yala">Yala</option>
  <option value="Lamphun">Lamphun</option>
  <option value="Narathiwat">Narathiwat</option>
  <option value="Chonburi">Chonburi</option>
  <option value="Mukdahan">Mukdahan</option>
  <option value="Bueng Kan">Bueng Kan</option>
  <option value="Phangnga">Phangnga</option>
  <option value="Yasothon">Yasothon</option>
  <option value="Nong Bua Lamphu">Nong Bua Lamphu</option>
  <option value="Saraburi">Saraburi</option>
  <option value="Rayong">Rayong</option>
  <option value="Phatthalung">Phatthalung</option>
  <option value="Ranong">Ranong</option>
  <option value="Amnat Charoen">Amnat Charoen</option>
  <option value="Nong Khai">Nong Khai</option>
  <option value="Trat">Trat</option>
  <option value="Phra Nakhon Si Ayutthaya">Phra Nakhon Si Ayutthaya</option>
  <option value="Satun">Satun</option>
  <option value="Chainat">Chainat</option>
  <option value="Nakhon Pathom">Nakhon Pathom</option>
  <option value="Nakhon Nayok">Nakhon Nayok</option>
  <option value="Pattani">Pattani</option>
  <option value="Bangkok">Bangkok</option>
  <option value="Pathum Thani">Pathum Thani</option>
  <option value="Samut Prakan">Samut Prakan</option>
  <option value="Angthong">Angthong</option>
  <option value="Samut Sakhon">Samut Sakhon</option>
  <option value="Singburi">Singburi</option>
  <option value="Nonthaburi">Nonthaburi</option>
  <option value="Phuket">Phuket</option>
  <option value="Samut Songkhram">Samut Songkhram</option>
      </select>
        </div>
        
    )
    return (
        <Layout>
            <Head>
                <title>Forecast</title>
            </Head>
            <div className='h-screen'>
            <Navbar links={token} />
                <div className='h-full flex justify-center bg-tri p-3'>
                    <div>
                        <div>
                        <h1 className='text-3xl font-bold text-fif text-center my-5 py-3'>Forecast</h1>
                <SelectProvince/>
                <div className='p-2 bg-pri rounded'>
                    <div condition={weather != null}>
                    <div className="Card flex bg-sec p-5 rounded text-2xl text-f">
                        <div className="top flex m-1 relative flex-col   items-center justify-center p-5 rounded">
                            <span className='z-10'>{weather.name}</span>
                            <div className='z-10'>{weather.weather.map((data)=>(
                                <div className='flex  justify-center items-center'>
                                    <img src={`http://openweathermap.org/img/wn/${data.icon}.png`}/>
                                <span>{data.main}</span>
                                </div>
                            ))}</div>
                            <div className='h-full left-0 top-0 w-full opacity-30 rounded bg-fur absolute z-0'></div>
                        </div>
                        <div className='flex flex-col'>
                        <div className='left p-3 relative m-1 text-center'>
                            <span className='z-10' >temperature : {weather.main.temp} ℃</span>
                            <div className='h-full left-0 top-0 w-full opacity-30 rounded bg-fur absolute z-0'></div>
                        </div>
                        <div className='right    flex'>
                            <div className='top flex relative  p-3 m-1  flex-col'>
                                <span className='z-10'>min temperature : {weather.main.temp_min} ℃</span>
                                <span className='z-10'>max temperature : {weather.main.temp_max} ℃</span>
                                <div className='h-full left-0 top-0 w-full opacity-30 rounded bg-fur absolute z-0'></div>
                            </div>
                            <div className='bottom p-3 m-1 relative rounded flex justify-center items-center'>
                                <span className='z-10'>feel like : {weather.main.feels_like} ℃</span>
                                <div className='h-full w-full opacity-30 rounded bg-fur absolute z-0'></div>
                            </div>
                        </div>
                        </div>
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

export default withAuth(Forcast)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


