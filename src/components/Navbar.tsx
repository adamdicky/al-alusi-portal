import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white flex flex-row h-20 m-2 px-6 rounded-2xl border border-gray-200 text-black font-bold justify-between items-center'>
      <div className='flex items-center'>
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={70}
          height={70}
          className=''
        ></Image>
      </div>

      <div className='flex flex-row items-center gap-10'>
        <h6><a href=''>School News</a></h6>
        <h6><a href=''>Class News</a></h6>
        <h6><a href=''>Student Application</a></h6>
      </div>

      <div></div>
      
    </nav>
  )
}

export default Navbar