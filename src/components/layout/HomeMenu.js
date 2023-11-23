import Image from 'next/image'
import React from 'react'

const HomeMenu = () => {
  //<></>
  return (
    <section className="">
      <div className="absolute h-full left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} alt={'sallad'} width={109} height={189} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} alt={'sallad'} width={107} height={195} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          Check out
        </h3>
        <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
      </div>
    </section>
  )
}

export default HomeMenu
