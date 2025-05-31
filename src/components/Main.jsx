import { Navbar } from './Navbar'
import Home from './Home'
import { useState } from 'react'

export const Main = () => {

  const [menu,setMenu] = useState("");
  const [search,setSearch] = useState("");

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar setMenu = {setMenu} setSearch = {setSearch}/>
        <Home menu={menu} search={search}/>
    </div>
  )
}
