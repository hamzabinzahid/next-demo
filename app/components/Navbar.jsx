import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-white border border-b-2 flex justify-between px-5 items-center py-3">
      {/* Logo */}
      <div className="logo-img">
        <Image src={"/assets/images/logo.png"} alt='LOGO'
          className='w-12'
          height={100}
          width={200}
        />
      </div>
      <div className="title flex">
        <p className="text-lg">Caspian Pizza</p>
      </div>
    </div>
  )
}

export default Navbar