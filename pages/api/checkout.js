import Stripe from 'stripe';
export default async function handler(req, res) {
    //Stop non-post requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'POST method required' });
    }

    const body = JSON.parse(req.body);

    //Stop checkout without items
    if (body.lineItems.length === 0) {
        return res
            .status(405)
            .json({ message: 'Please select items for purchase' });
    }

    try {
        //New Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
            apiVersion: '2022-11-15',
        });

        console.log('Here ya go:' + stripe); //check here

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body.lineItems,
            mode: 'payment',
        });

        res.status(201).json({ session });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

// import Stripe from 'stripe';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'POST method required' });
//     }

//     const body = JSON.parse(req.body);

//     if (body.lineItems.length === 0) {
//         return res
//             .status(405)
//             .json({ message: 'Please select items for purchase' });
//     }

//     try {
//         const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
//             apiVersion: '2022-11-15',
//         });

//         const session = await stripe.checkout.sessions.create({
//             success_url: 'http://localhost:3000/success',
//             cancel_url: 'http://localhost:3000/cancel',
//             line_items: body.lineItems,
//             mode: 'payment',
//         });

//         res.status(201).json({ session });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// }
