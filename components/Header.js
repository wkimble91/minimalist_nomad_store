import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import styles from './header.module.css';
import { useAppContext } from '../context/CartContext';
import logo from '../public/logo-sm-light.png';

export default function Header() {
    const { state, dispatch } = useAppContext();
    const [displayCheckout, setDisplayCheckout] = useState(false);
    const modalRef = useRef();

    async function checkout() {
        const lineItems = Object.keys(state.products).map((id) => {
            return {
                price: id,
                quantity: 1,
            };
        });
        console.log('Here is line items quantity', state.products);

        const res = await fetch('api/checkout', {
            method: 'POST',
            body: JSON.stringify({ lineItems }),
        });

        const data = await res.json();

        Router.push(data.session.url);
    }

    function increment(id, size, count) {
        return () =>
            dispatch({
                type: 'vary_count',
                value: [id, size, count + 1],
            });
    }

    function removeItem(id, size, count) {
        dispatch({
            type: 'remove_product',
            value: [id, size, (count = 0)],
        });
    }

    function decrement(id, size, count) {
        if (count - 1 > 0) {
            return () =>
                dispatch({
                    type: 'vary_count',
                    value: [id, size, count - 1],
                });
        }
        return () =>
            dispatch({
                type: 'remove_product',
                value: [id, size],
            });
    }

    return (
        <nav className='flex items-center justify-between white shadow-lg sticky top-0 relative z-50 relative'>
            {displayCheckout && (
                <div
                    ref={modalRef}
                    className='absolute bg-white shadow border border-gray-200 border-solid z-50 top-0 h-screen w-screen sm:w-80 right-0 flex flex-col gap-2 px-2'
                >
                    <div className='overflow-auto flex-1'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-4xl py-4 text-neutral-700'>
                                CART
                            </h1>
                            <div
                                className='text-black ml-auto w-fit p-2 cursor-pointer select-none transition duration-300 hover:opacity-50'
                                onClick={() => setDisplayCheckout(false)}
                            >
                                ╳
                            </div>
                        </div>
                        <hr className='py-2' />
                        {Object.keys(state.products).map((productId, index) => {
                            const prod = state.products[productId];
                            const product = state.prices.find(
                                (val) => val.id === productId
                            );
                            return (
                                <div
                                    key={index}
                                    className='flex flex-col gap-4 text-neutral-700'
                                >
                                    {Object.keys(prod).map((size) => {
                                        const quantity = prod[size];
                                        return (
                                            <div
                                                key={size}
                                                className='border-l border-solid border-gray-100 text-xs  p-2 flex flex-col gap-3'
                                            >
                                                <div className='flex items-center justify-between'>
                                                    <p className='truncate'>
                                                        {product.product.name}
                                                    </p>
                                                    <p>
                                                        $
                                                        {(product.unit_amount /
                                                            100) *
                                                            quantity +
                                                            '  '}
                                                    </p>
                                                </div>
                                                <div className='font-extralight flex justify-between items-center'>
                                                    <h1>SIZE: {size}</h1>
                                                    <div>
                                                        <h1>
                                                            QUANTITY:{' '}
                                                            <span className='pl-4 border border-solid py-1 pr-6 border-gray-400 ml-3 relative'>
                                                                {quantity}
                                                                <div className='absolute top-0 right-0 h-full w-3 flex flex-col '>
                                                                    <div
                                                                        className='leading-none scale-75 cursor-pointer'
                                                                        onClick={increment(
                                                                            productId,
                                                                            size,
                                                                            quantity
                                                                        )}
                                                                    >
                                                                        <i className='fa-solid fa-chevron-up'></i>
                                                                    </div>
                                                                    <div
                                                                        className='leading-none scale-75 cursor-pointer'
                                                                        onClick={decrement(
                                                                            productId,
                                                                            size,
                                                                            quantity
                                                                        )}
                                                                    >
                                                                        <i className='fa-solid fa-chevron-down'></i>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={checkout}
                        className=' m-1 shadow bg-black font-light text-sm py-2 transition duration-300 hover:opacity-50 select-none'
                    >
                        CHECKOUT
                    </button>
                </div>
            )}
            <a
                href='https://minimalistnomad.world'
                className='mx-0 sm:ml-2 scale-75 md:scale-100 hover:opacity-70 cursor-pointer transition duration-300'
            >
                <Image src={logo} alt='logo' width={75} height={75} />
            </a>
            <div
                onClick={() => Router.push('/')}
                className={
                    ' text-xl px-4 py-6 font-normal select-none text-center sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer transition hover:opacity-80 ' +
                    ` ${styles.title}`
                }
            >
                Minimalist Nomad Store
            </div>
            <div
                className='relative text-white cursor-pointer grid place-items-center transition hover:opacity-70 duration-300'
                onClick={() => setDisplayCheckout(!displayCheckout)}
            >
                <i className='fa-solid fa-bag-shopping sm:pr-4 text-l sm:text-2xl mr-4'></i>
                {Object.keys(state.products).length > 0 && (
                    <div className='absolute inset-0 mx-auto top-1.5 h-2 w-2 rounded-full bg-rose-400 z-20' />
                )}
                <p className='pr-4 sm:pr-8 font-light text-xs sm:text-base'>
                    CART
                </p>
            </div>
        </nav>
    );
}
