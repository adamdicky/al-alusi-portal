'use client'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import Button from './Button'

const Dashboard = () => {
    const [activeTab, setActiveTab] = React.useState('newsfeed')

    return (
        <div className="p-3 flex min-h-screen flex-col">
            <main className="flex flex-1 gap-x-4">
                {/* left space */}
                <aside className="flex flex-col items-center w-1/5 gap-y-7 bg-white p-4  border border-gray-200 rounded-3xl mb-40">
                    <div className='flex flex-row items-center justify-evenly gap-x-4'>
                        <Image
                            src="/logo.jpg"
                            alt="Logo"
                            width={70}
                            height={70}
                            className=''
                        />
                        <a className='hidden lg:block text-[35px] font-bold text-black '>Al-Alusi Portal</a>
                    </div>
                    
                    <ul className="w-full space-y-3 text-black text-[23px]">
                        <li className='flex flex-row gap-x-3 p-2 rounded-md  hover:bg-[#F1F1F1]'>
                            <Image
                                src="newspaper.svg"
                                alt="Newsfeed"
                                width={20}
                                height={20}
                            />
                            <button onClick={() => setActiveTab('newsfeed')} className="w-full text-left">
                                Newsfeed Management
                            </button>
                        </li>
                        <li className='flex flex-row gap-x-3 p-2 rounded-md  hover:bg-[#F1F1F1]'>
                            <Image
                                src="users.svg"
                                alt="Newsfeed"
                                width={20}
                                height={20}
                            />
                        <button onClick={() => setActiveTab('user')} className="w-full text-left">
                            User Management
                        </button>
                        </li>
                    </ul>
                </aside>

                {/* right space */}
                <section className="flex flex-1 flex-col p-6 gap-y-12  justify-stretch bg-white border border-gray-200 rounded-3xl mb-40 text-[20px]">
                                {/* {activeTab === 'newsfeed' && <NewsfeedManagement />}
                                {activeTab === 'user' && <UserManagement />} */}
                    <div className='flex flex-row gap-x-8 '>
                        <div className='w-full h-76  text-black'>
                            <b>Pending Newsfeed Approvals</b>
                            <div className='flex flex-col gap-y-2 p-4 overflow-y-auto bg-[#F1F1F1] rounded-md h-full border border-gray-200'>
                                    <a className='bg-white rounded-lg p-2'>Class 1USM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UKM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UPM</a>
                            </div>
                        </div>

                        <div className='w-full h-76 text-black'>
                            <div className='flex flex-row justify-between'>
                                <b>Published School Newsfeed</b>
                                <Button type="button" title="Create New" icon="/plus.svg" /> 
                            </div>
                            <div className='flex flex-col gap-y-2 p-4 overflow-y-auto bg-[#F1F1F1] rounded-md h-full border border-gray-200'>
                            <a className='bg-white rounded-lg p-2'>Class 1USM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UKM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UPM</a>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row '>
                        <div className='w-full h-76 text-black'>
                            <b>Recently Approved Newsfeed</b>
                            <div className='flex flex-col gap-y-2 p-4 overflow-y-auto bg-[#F1F1F1] rounded-md h-full border border-gray-200'>
                            <a className='bg-white rounded-lg p-2'>Class 1USM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UKM</a>
                                    <a className='bg-white rounded-lg p-2'>Class 1UPM</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Dashboard