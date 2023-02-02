import React from 'react';

export default function Footer() {
    return (
        <div className='flex justify-center py-4'>
            <i className='fa-brands fa-reddit-alien transition hover:text-orange-600 hover:scale-125 px-4 cursor-pointer'></i>
            <i className='fa-brands fa-snapchat transition hover:text-yellow-500 hover:scale-125 px-4 cursor-pointer'></i>
            <i className='fa-brands fa-twitter transition hover:text-sky-600 hover:scale-125 px-4 cursor-pointer'></i>
            <i className='fa-brands fa-facebook transition hover:text-sky-800 hover:scale-125 px-4 cursor-pointer'></i>
            <i className='fa-brands fa-instagram transition hover:text-rose-600 hover:scale-125 px-4 cursor-pointer'></i>
        </div>
    );
}
