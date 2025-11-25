import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import LinRegABI from "../ABI/Linear_Regression.json";
import LinSVMABI from "../ABI/LinearSVM.json";
import LogRegABI from "../ABI/Logistic_Regression.json";
import PolyRegABI from "../ABI/Polynomial_Regression.json";

const Biding = ({ title, imgUrl }) => {
    const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [account, setAccount] = useState("None");
  const [isConnecting, setIsConnecting] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contractLinearRegression: null,
    contractLinearSVM: null,
    contractPolynomialRegression: null,
    contractLogRegression: null,
  });

  const CONTRACT_CONFIG = {
    linearRegression: {
      address: "0x0fc7B52Ec3FaB9626974555D06535D4a76448434",
      abi: LinRegABI.abi
    },
    polynomialRegression: {
      address: "0xf23c4a11E9c6B3c67C054e0fBd97802849BAe7c5",
      abi: PolyRegABI.abi
    },
    logisticRegression: {
      address: "0xec92ec4120572F05914c69D0c5ad61C19C4fdc29",
      abi: LogRegABI.abi
    },
    linearSVM: {
      address: "0xE9F97789E4AC9C446695AAe4EEa093e4EE364241",
      abi: LinSVMABI.abi
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      if (!isConnecting) {
        setIsConnecting(true);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();

        // Initialize contracts
        const contracts = {};
        for (const [key, value] of Object.entries(CONTRACT_CONFIG)) {
          const contractName = `contract${key.charAt(0).toUpperCase() + key.slice(1)}`;
          contracts[contractName] = new ethers.Contract(value.address, value.abi, signer);
        }

        const newState = {
          provider,
          signer,
          ...contracts
        };

        setAccount(accounts[0]);
        setState(newState);

        ethereum.on("chainChanged", () => window.location.reload());
        ethereum.on("accountsChanged", () => window.location.reload());
      }
    } catch (error) {
      if (error.code === -32002) {
        console.log("MetaMask is already processing a request. Please wait.");
      } else {
        console.error("Error connecting wallet:", error);
      }
    } finally {
      setIsConnecting(false);

    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const inputValue = document.getElementById('hh').value;
      console.log("Input value:", inputValue);

      if (!state.contractLinearRegression) {
        await connectWallet();
      }

      const tx = await state.contractLinearRegression.predict(inputValue);
      console.log("Transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
      setPredictionResult(receipt);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error making prediction. Please make sure your wallet is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Biding-outer'>
      <div className='Biding'>
        <div className='Biding-1'>
          <div className='Biding-container-outer'>
            <div className='Biding-container-inner'>
              <img src={imgUrl} className='Assest-image' />
            </div>
          </div>
          <p className='infos1'>Asset Owner - Lakshya</p>
          <p className='infos2'>Asset Owner Address - mantra1u.....vg0</p>
        </div>
        <div className='Biding-2'>
          <div className='headings'>
            <p className='Asset-Name'>Asset Name</p>
            <div className='tags'>
              <p className='tag1'>Current Bid</p>
              <p className='tag2'>Base Bid</p>
            </div>
          </div>
          <div className='bid-values'>
            <p className='Asset-heading'>{title}</p>
            <p className='current-bid'>1.248 OM</p>
            <p className='base-price'>0.5 OM</p>
          </div>
          <p className='Time'>Time Left - 15hr</p>
          <p className='Description'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
          </p>
          <div className="input-group mb-3 input-class">
            <span className="input-group-text"></span>
            <input type="number" id="hh" className="form-control input-values" aria-label="Amount (to the nearest dollar)" placeholder='Predict price' />
          </div>
          <button type="button" className="btn btn-warning" onClick={handleClick}>Predict</button>
        </div>
      </div>
    </div>
  );
}

export default Biding;
