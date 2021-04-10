import React from 'react';
import { PlaidLink } from 'react-plaid-link';

const Navbar = ({ plaidLink }) => {
    const { open, ready } = plaidLink

    return (
        <div>
            <PlaidLink onClick={() => open()} disabled={!ready}>
                Link with Plaid
            </PlaidLink>
        </div>
    )
}

export default Navbar;