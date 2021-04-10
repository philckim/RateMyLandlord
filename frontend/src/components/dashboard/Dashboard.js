import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PlaidLink, usePlaidLink } from 'react-plaid-link';

const Dashboard = () => {

  const [linkToken, setLinkToken] = useState("");
  const [plaidData, setPlaidData] = useState("");

  useEffect(() => {
    const createLinkToken = async () => {
      console.log('Getting temp link_token... ');
      const res = await axios.get('http://localhost:5000/api/plaid/create-link-token');
      console.log(res.data)
      const {data: { linkToken: tokenData }} = res
      setLinkToken(tokenData)
      console.log('link_token: ', linkToken);
    }
    createLinkToken()
  }, []);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    console.log('Attempting token exchange...')
    console.log('linkToken: ', linkToken)
    const { data } = await axios.post('http://localhost:5000/api/plaid/token-exchange', {
      publicToken: publicToken,
    });
    setPlaidData({data});
  }, []);

  const config = {
    token: linkToken,
    onSuccess
  };

  const plaidLink = usePlaidLink(config);

  return (
    <div>
      <div>
        <h3>Your Personal Dashboard</h3>
        <PlaidLink token={linkToken} onSuccess={onSuccess}>
          Link via Plaid
        </PlaidLink>
      </div>
  </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);