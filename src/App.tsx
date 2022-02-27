import React, { useEffect, useState } from 'react';

import './App.css';

declare const window: any

const App: React.FC = () => {

  const [walletAddress, setWalletAddress] = useState<string>('')

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      const {solana}  = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
      } else {
        alert('Get a Phantom Wallet')
      }
    } catch (error) {
      console.log(error)
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
    <div>Solana</div>
  )
}

export default App;
