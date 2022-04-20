import Link from 'next/link'

const Navbar = token => (
    <div className='bg-sec p-3 z-10 flex justify-between'>
        <div>
        <Link  href="/"><a className='text-fur'> Home </a></Link>        <Link href="/profile"><a  className='p-2 text-fur'> Profile </a></Link>
        <Link href="/forcast"><a  className='p-2 text-fur'>  Forcast </a></Link>
        </div>
        { token.links ?(
                    <Link href="/logout"><a  className='p-2 text-fur bg-fif rounded'> Logout </a></Link> 

        ):null}
    </div>
)

export default Navbar