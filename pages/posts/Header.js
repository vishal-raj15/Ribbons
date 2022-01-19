import Image from "next/image";
//import HeaderItem from "./HeaderItem";
import {
    HomeIcon,
    CubeIcon
} from "@heroicons/react/outline"

import Link from 'next/link'

import Imgh from '../../public/headName.png';
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"

import { ethers , BigNumber} from 'ethers';

function Header(){

    const [user , setUser] = useState();

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


    return(

        <header className="flex flex-col sm:flex-row m-2 mt-10 justify-between
        items-center h-auto"> 

        <div className="flex flex-grow justify-evenly gap-5 max-w-md"> 
           

            <Link href="/">
            <a className="text-xl font-bold">home</a>
            </Link>

            <Link href="/posts/mintingFrontPage">
            <a className="text-xl font-bold ">Mint</a>
            </Link>


            
            

       
        </div>
        { !user ? 
            <button className=" py-1 px-4 rounded bg-[#4FBDBA] text-white hover:bg-[#35858B]"
            onClick={ConnectWallet}>
            connect wallet
          </button> :
          <p className=" text-white-800"> {user}</p>    
        }
        
        <Image 

            className="object-contain"
            src={Imgh}
            alt="a"
            width={110}
            height={50}
        />
        </header>
    )
}

export default Header



