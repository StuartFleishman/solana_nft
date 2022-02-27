import React, { useEffect } from 'react';

import './App.css';

declare const window: any

const App: React.FC = () => {

  const checkIfWalletIsConnected = async (): Promise<void> => {
    try {
      const {solana}  = window;
      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!')
      } else {
        alert('Get a Phantom Wallet')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

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
