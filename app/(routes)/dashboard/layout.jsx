import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from '@/app/components/DashboardHeader'

const DashboardLayout = ({children}) => {
  return (
    <>
    <div className='flex '>

    <div className='fixed md:w-64 hidden md:block'><SideNav/></div>
    <div className='md:ml-64 w-full'>
    <DashboardHeader/>
      {children}</div>
    </div>
    </>
  )
}

export default DashboardLayout