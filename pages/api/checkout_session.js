const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items, email } = req.body;
      const transformedItems = items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      }));

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_options: [
          { shipping_rate: 'shr_1M06RhFi1WS1eFDiBDayUICB' },
          { shipping_rate: 'shr_1M06TPFi1WS1eFDiJTb6CS4z' },
        ],
        billing_address_collection: 'auto',
        line_items: transformedItems,
        success_url: `https://iashop.vercel.app/success`,
        cancel_url: `https://iashop.vercel.app/canceled`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
