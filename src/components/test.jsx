

import React, { useState, useEffect } from 'react';

const CryptoPrice = () => {
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('black');

  useEffect(() => {
    const ws = new WebSocket('wss://wbs.mexc.com/ws');
    ws.addEventListener('open', () => console.log('WebSocket opened'));
ws.addEventListener('error', (error) => console.error('WebSocket error:', error));

    ws.onopen = () => {
  // Várunk egy kicsit, mielőtt küldenénk az üzenetet
  setTimeout(() => {
    const subscriptionMessage = {
      "method": "SUBSCRIPTION",
      "params": [
        "spot@public.deals.v3.api@BTCUSDT"
      ],
    };
    ws.send(JSON.stringify(subscriptionMessage));
  }, 1000); // Például 1000 milliszekundum (1 másodperc) várakozás
};

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // const newPrice = data.d?.deals?.[0]?.p;
      const newPrice = parseFloat(data.d?.deals?.[0]?.p).toLocaleString('hu-HU');

      console.log(data)

      if (newPrice > price) {
        setColor('green');
      } else if (newPrice < price) {
        setColor('red');
      } else {
        setColor('black');
      }

      setPrice(newPrice);
    };

    ws.onclose = () => {
      console.log('WebSocket kapcsolat bezárva');
    };

    ws.onerror = (error) => {
      console.error('WebSocket hiba:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

 return (
   <div>
     <h2 id='stock-price'>Current BTCUSDT.P Price: <span style={{ color: color }}>{price}</span></h2>
    </div>
  );
};

export default CryptoPrice;

// import React, { useState, useEffect } from 'react';

// const CryptoPrice = () => {
//   const [price, setPrice] = useState('');
//   const [color, setColor] = useState('black');

//   useEffect(() => {
//     let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
  

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       const newPrice = data.p;
//       if (newPrice > price) {
//         setColor('green');
//       } else if (newPrice < price) {
//         setColor('red');
//       } else {
//         setColor('black');
//       }
//       setPrice(newPrice);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [price]);

//   return (
//     <div>
//       <h2 id='stock-price'>Current ETH/USDT.P Price: <span style={{ color: color }}>{price}</span></h2>
//     </div>
//   );
// };

// export default CryptoPrice;


// import React, { useState, useEffect } from 'react';

// const CryptoPosition = () => {
//   const [accountInfo, setAccountInfo] = useState(null);
//   const [apiKey, setApiKey] = useState('mx0vglbPicgJIOUd4n'); // Ide helyettesítsd be az API kulcsodat
//   const [apiSecret, setApiSecret] = useState('76df93f6ecae4621837d88f1454dd90a'); 

//   useEffect(() => {
//     const ws = new WebSocket('wss://wbs.mexc.com/ws');
//     ws.addEventListener('open', () => {
//       const subscriptionMessage = {
//         "method": "SUBSCRIPTION",
//         "params": [
//           `futures@account:${apiKey}`
//         ],
//         "id": "futures-account"
//       };
//       ws.send(JSON.stringify(subscriptionMessage));
//     });

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.id === "futures-account" && data.data) {
//         setAccountInfo(data.data);
//       }
//     };

//     ws.onclose = () => {
//       console.log('WebSocket kapcsolat bezárva');
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket hiba:', error);
//     };

//     return () => {
//       ws.close();
//     };
//   }, [apiKey, apiSecret]);

//   const handleApiKeyChange = (event) => {
//     setApiKey(event.target.value);
//   };

//   const handleApiSecretChange = (event) => {
//     setApiSecret(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Your Futures Account Information:</h2>
//       {accountInfo && (
//         <div>
//           <p>Equity: {accountInfo.equity}</p>
//           <p>Balance: {accountInfo.balance}</p>
//           <p>Available: {accountInfo.available}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CryptoPosition;

