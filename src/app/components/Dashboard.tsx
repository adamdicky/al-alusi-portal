'use client'
import React from 'react'
import { useState } from 'react'

const Dashboard = () => {
    const [activeTab, setActiveTab] = React.useState('newsfeed')

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex flex-1">
                <aside className="w-1.5/5 bg-black p-4">
                    <ul className="space-y-2">
                        <li>
                        <button onClick={() => setActiveTab('newsfeed')} className="w-full text-left">
                            Newsfeed Management
                        </button>
                        </li>
                        <li>
                        <button onClick={() => setActiveTab('user')} className="w-full text-left">
                            User Management
                        </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Content
                <section className="flex-1 p-4">
                    {activeTab === 'newsfeed'}
                    {activeTab === 'user'}
                </section> */}
            </main>
        </div>
    )
}

export default Dashboard