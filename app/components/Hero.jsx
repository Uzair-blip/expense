import React from 'react'
import { useRouter } from 'next/navigation'
const Hero = () => {
const router=useRouter()
    return (
    <>

<section className="bg-gray-50 ]">
  <div className="mx-auto w-[50%]  px-4 py-32 lg:flex h-[50%] lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-6xl font-extrabold sm:text-5xl">
        Track your Expenses
        <strong className="font-extrabold text-blue-600 sm:block"> Control your Money  </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
  Best for Creating your budget and save your money 
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
          onClick={()=>router.push("/SignIn")}
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>
</>
)
}
export default Hero