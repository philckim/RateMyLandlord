import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { usePlaidLink, PlaidLink } from 'react-plaid-link';

const Dashboard = () => {

  const [linkToken, setLinkToken] = useState("");
  const [plaidData, setPlaidData] = useState(""); 


  useEffect(() => {
    const fetchLinkToken = async () => {
      const linkTokenData = await axios.get('/api/plaid/create-link-token');
      const {
        data: { linkToken: tokenData },
      } = linkTokenData;
        setLinkToken(tokenData)
      }
      fetchLinkToken();
  }, []);

  const onSuccess = useCallback(async (token, metadata) => {
    const { data } = await axios.post('/api/plaid/token-exchange', {
      publicToken: token,
    });
    setPlaidData(data);
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div>
      <div>
        Link your accounts via plaid...
      </div>
      <PlaidLink
        token={linkToken}
        onSuccess={onSuccess}
      >
        Connect a bank account
      </PlaidLink>
    </div>
  );
}

export default Dashboard;