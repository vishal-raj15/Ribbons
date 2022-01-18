
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"


import { ethers , BigNumber} from 'ethers';
import { MaxUint256 } from '@ethersproject/constants';

import NFT from '../../artifacts/RandomSVG.json';
import LinkSC from '../../artifacts/LinkToken.json';

	const overrides = {
  gasLimit: 9999999
}

function expandTo18Decimals(n) {
  return BigNumber.from(n).mul(BigNumber.from(10).pow(18))
}

//let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')


export default function Home() {

  const [userAccount, setUserAccount] = useState()
  const [recAccount, setRecAccount] = useState()
  const [amount, setAmount] = useState()

  var nftAddress = "0xB085E2265E48E1456Dcc15Eb658056CB7Ad81567";

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  

  async function mint(){

    let val = parseInt(amount);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const chainId = await signer.getChainId();

    const linkTokenAddress = '0x01be23585060835e02b77ef475b0cc51aa1e0709'
    const vrfCoordinatorAddress = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
    const keyHash = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'
    const fee = '100000000000000000'
    const fundAmount = '1000000000000000000'


    const LinkToken = new ethers.Contract(linkTokenAddress , LinkSC.abi , signer);

    let fund_tx = await LinkToken.transfer( nftAddress , fundAmount);

    await fund_tx.wait(1);

    const NFTcontract = new ethers.Contract(nftAddress , NFT.abi , signer);

    console.log( chainId);

    console.log(" provider ",signerAddress);

      if( val <= 0){
        console.log(" error , put some integer ");
      }

     else{
        console.log( " starting ..............");
        let tx = await NFTcontract.create( val, { gasLimit: 3000000 });
        let receipt = await tx.wait(1);
        let tokenId = receipt.events[3].args.tokenId;
        tokenId = tokenId.toString();
        tokenId = parseInt(tokenId);

        for( let i=tokenId ; i < val + tokenId ; i++){
          let delta = Math.floor( Math.random()*1000000);


          console.log( " minting ", i, "th nft ");
          let tx = await NFTcontract.mintNft( i , signerAddress , delta);
          await tx.wait(1);
        }

        if( chainId != 31337){

          console.log( "now finish the minting process ...");
          for( let i=tokenId ; i< tokenId + val ; i++){

            let minttx = await NFTcontract.finishMint( i, { gasLimit: 20000000 });
            await minttx.wait(1);
            console.log( i,`th tokenURL ${ await NFTcontract.tokenURI(i)}`);
          }
        }

    }




  }

  return (
    <div >
     
     <div className="mt-40 flex-grow grid place-items-center tracking-widest"> 
            <p1 className=" mt-20 text-center text-5xl"> Fully decentralise NFTs</p1>

            
            <p1 className=" m-2 text-center text-5xl"> Mint your own NFTs on-chain</p1>
            {/* <h1 className=" m-5 text-justify text-3xl "> This is a random digital art generatator platform on-chain on rinkeby network with the help of chainlink protocol</h1> */}

        </div>

        <div className="mt-10 flex-grow grid place-items-center "> 


    <input className='place-items-center text-center h-20 w-96 text-4xl text-white rounded-lg 
                      bg-black border-white border-2 focus:border-blue-500 ' onChange={e => setAmount(e.target.value)} placeholder="Number of NFTs" />

    <button className="mt-5 py-4 px-10 rounded bg-[#4FBDBA] text-white hover:bg-[#35858B]"
      onClick={mint}>
      MINT
    </button>



    </div>

    </div>
  )
}
