import React from 'react';
import { ethers } from "ethers";
import { Input, Loader, Button, Form, Segment } from 'semantic-ui-react'

const defaultMnemonic = process.env.REACT_APP_DEFAULT_MNEMONIC;
const defaultPath = "m/44'/60'/0'/0/0"

function Wallet() {
  const infuraEndpoint = process.env.REACT_APP_INFURA_ENDPOINT;
  const [mnemonic, setMnemonic] = React.useState<string | undefined>(defaultMnemonic);
  const [path, setPath] = React.useState<string>(defaultPath);
  const [wallet, setWallet] = React.useState<ethers.Wallet | undefined>();
  const [balance, setBalance] = React.useState<string>();
  const [createWalletError, setCreateWalletError] = React.useState<string>();

  const handleWalletSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const provider = ethers.providers.getDefaultProvider(infuraEndpoint)

    try {
      let newWallet = ethers.Wallet.fromMnemonic(mnemonic!, path);
      let ethersWallet = new ethers.Wallet(newWallet.privateKey, provider);
 
      setWallet(ethersWallet);
    } catch(e){
      if(typeof e.message === "string" ) {
        setCreateWalletError(e.message)
      } else {
        setCreateWalletError("failed")
      }
    }
  }

  const handleClearWallet = () => {
    setWallet(undefined)
  }

  const handleSetMnemonic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMnemonic(e.target.value)
  }

  const handleSetPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value)
  }
 
  React.useEffect(() => {
    const setCurrentBalance = async() => {
        if(!wallet) return;
        const balance = await wallet.getBalance();
        const formattedBalance = ethers.utils.formatEther(balance);
        setBalance(`${formattedBalance} ETH`);
    }
    setCurrentBalance();
  }, [wallet]);

  if(wallet) {
    return (
      <>
      <Segment className="Container">
        <b className="DarkText">address: {wallet.address}</b>
        <b className="DarkText" 
           style={{ flexDirection: "row", padding: "8px 0", alignItems: "center"}}>
           balance: {balance ? balance : <Loader active inline />}
        </b>
      </Segment>
      <Button onClick={handleClearWallet}>Change Account</Button>
      </>
    )
  }
  return (
    <Form onSubmit={handleWalletSubmit} className="Container">
      <Form.Field>
        <Input label="mnemonic" type="text" name="mnemonic" value={mnemonic} onChange={handleSetMnemonic}/>
      </Form.Field>
      <Form.Field>
        <Input label="path" type="text" name="path" value={path} onChange={handleSetPath}/>
      </Form.Field>
      <b style={{ color: "red" }}>{createWalletError}</b>
      <Button type="submit">Open Wallet</Button>
    </Form>
  );
}

export default Wallet;
