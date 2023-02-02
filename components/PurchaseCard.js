import Router from 'next/router';
import React from 'react';

export default function PurchaseCard(props) {
    const { price } = props;
    if (price.product.active === true) {
        return (
            <div
                onClick={() => Router.push(`/${price.id}`)}
                className='w-60 h-80 shadow-md border border-solid border-gray-100 cursor-pointer transition hover:opacity-80 bg-white'
            >
                {price.product.images && (
                    <div className='h-60 object-contain'>
                        <img
                            src={price.product.images[0]}
                            alt={price.product.name}
                        ></img>
                    </div>
                )}
                <h1 className='text-sm text-center py-2 font-light tracking-light uppercase'>
                    {price.product.name}
                </h1>
                <p className='text-sm text-center py-2 font-extralight tracking-light'>
                    ${price.unit_amount / 100}
                </p>
            </div>
        );
    }
}
