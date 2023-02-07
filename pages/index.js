import PurchaseCard from '../components/PurchaseCard';
import { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Stripe from 'stripe';
import { useAppContext } from '../context/CartContext';

export async function getServerSideProps(context) {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
        apiVersion: '2022-11-15',
    });

    const res = await stripe.prices.list({
        limit: 10,
        expand: ['data.product'],
    });

    const prices = res.data.filter((price) => {
        return price.active;
    });

    return {
        props: { prices }, // will be passed to the page component as props
    };
}

export default function Home({ prices }) {
    const { state, dispatch } = useAppContext();

    useEffect(() => {
        dispatch({
            type: 'set_prices',
            value: prices,
        });
    }, [prices]);
    return (
        <div className='flex flex-col flex-1 '>
            <Head>
                <title>Minimalist Nomad Store</title>
                <meta name='description' content='Minimalist Nomad ecommerce store' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='relative flex flex-wrap gap-5 p-5 max-w-6xl my-0 mx-auto justify-center '>
                {prices.map((price, index) => {
                    return (
                        <PurchaseCard
                            key={index}
                            className='my-2 h-20'
                            price={price}
                        />
                    );
                })}
            </main>
        </div>
    );
}
