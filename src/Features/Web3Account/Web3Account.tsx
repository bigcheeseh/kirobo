import React from 'react';
import { ethers } from "ethers";


function Web3Account() {
  const infuraEndpoint = "https://kovan.infura.io/v3/c794d84311a643b299680974f24a9d91"
  console.log(ethers);
  React.useEffect(() => {
    const provider = ethers.providers.getDefaultProvider(infuraEndpoint)
    let walletPath = {
        "standard": "m/44'/60'/0'/0/0",
    };

    let mnemonic = "next february eternal worry ivory access mean wash cry involve economy bacon faint actual combine";
    let newWallet = ethers.Wallet.fromMnemonic(mnemonic, walletPath.standard);

    let wallet = new ethers.Wallet(newWallet.privateKey, provider);
    console.log(newWallet.address);

    const getBalance = async() => {
       const balance = await wallet.getBalance();

       console.log(ethers.utils.formatEther(balance), wallet.provider);
       ethers.utils.formatEther(balance)
    }

    getBalance()
  }, []);

  return (
    <div>
    </div>
  );
}

export default Web3Account;
