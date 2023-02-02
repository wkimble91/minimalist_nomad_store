import React, { Children } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen relative'>
            <Header />
            <div className='flex flex-col flex-1'>
                <main className='flex-1 py-5 sm:max-w-2/3 mx-auto flex flex-wrap gap-5'>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
