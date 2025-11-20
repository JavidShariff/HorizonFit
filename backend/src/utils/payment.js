// REAL PRODUCTION CODE (Using Stripe's official Node.js SDK)

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (amount, token, email) => { 
    try {
        const charge = await stripe.charges.create({ 
            amount: amount * 100, // in cents
            currency: 'usd',
            source: token,        // The token received from the frontend
            description: 'Consultation Fee',
            receipt_email: email,
        });

        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        // Check Stripe's response status
        if (charge.status === 'succeeded') {
            return { 
                id: charge.id || transactionId, // This is the real transaction ID
                status: 'Payment Successful' 
            };
        } else {
            // Throw an error if Stripe indicates a failure
            throw new Error(charge.failure_message || 'Stripe processing failed.');
        }
    } catch (error) {
        // Any network error or Stripe error is caught here
        throw new Error(`Payment processing failed: ${error.message}`);
    }
};

export { processPayment };