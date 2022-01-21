
import Head from 'next/head';
import Middle from './posts/Middle';
import Link from 'next/link'
import MintPage from './posts/MintPage';


import Image from "next/image";
//import HeaderItem from "./HeaderItem";
import {
    HomeIcon,
    CubeIcon
} from "@heroicons/react/outline"

import Imgh from '../public/headName.png';
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"

import { ethers , BigNumber} from 'ethers';
// import { contract } from '@chainlink/test-helpers';
// import { eventDoesNotExist } from '@chainlink/test-helpers/dist/src/matchers';
// import { parseTransaction } from 'ethers/lib/utils';


export default function Home() {

  const [user , setUser] = useState();
  const [move1 , setMove1] = useState(false);

  const [move2 , setMove2] = useState(true);

  async function ConnectWallet(){

      if( !user){

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
  
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      setUser(signerAddress);

      }
  }

  async function fun1(){

    setMove1(true);
    setMove2(false);
  }

  async function fun2(){
    setMove2(true);
    setMove1(false);
  }

  return (
    <div className="">

<header className="flex flex-col sm:flex-row m-2 mt-10 justify-between
        items-center h-auto"> 

        <div className="flex flex-grow justify-evenly gap-5 max-w-md"> 
           

            <Link href="/">
            <a className="text-xl font-bold" onClick={fun1}>home</a>
            </Link>

            <Link href="">
            <a className="text-xl font-bold " onClick={fun2}>Mint</a>
            </Link>


            
            

       
        </div>
        { user ? 

            <p className=" py-1 px-4 rounded bg-[#4FBDBA] text-white hover:bg-[#35858B]"> {user}</p> :
            <button className=" py-1 px-4 rounded bg-[#4FBDBA] text-white hover:bg-[#35858B]"
            onClick={ConnectWallet}>
            connect wallet
          </button> 
             
        }
        
        <Image 

            className="object-contain"
            src={Imgh}
            alt="a"
            width={110}
            height={50}
        />
        </header>

        {
          !move1 ? < MintPage />:<Middle />
        }
     
     {/* foolter ----------------- */}

    </div>
  )
}



