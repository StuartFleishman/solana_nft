import React, { useEffect, useState } from 'react';

import './App.css';

declare const window: any

const App: React.FC = () => {

  const [walletAddress, setWalletAddress] = useState<string>('')

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async (): Promise<void> => {
    const { solana } = window
    if (solana) {
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }

  const renderNotConnectedContainer = (): JSX.Element => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])


  return (
    <div>
    <h1>Solana NFT</h1>
    <div>{!walletAddress && renderNotConnectedContainer()}</div>
    </div>
  )
}

export default App;
