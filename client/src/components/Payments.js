// Stripe wrapper
// Renders a Payment Button
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
    render() {
        return (
            <StripeCheckout
                amount={500} // defaults to USD, measured in cents
                token={token => console.log(token)} // expects a callback function that will be called when we recieve a token back from stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Emaily"
                description="$5 for 5 email credits"
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        )
    }
}

export default Payments;