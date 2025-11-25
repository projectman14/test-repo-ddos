import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";
import { ethers } from "ethers";
import LinRegABI from "../ABI/Linear_Regression.json";
import LinSVMABI from "../ABI/LinearSVM.json";
import LogRegABI from "../ABI/Logistic_Regression.json";
import PolyRegABI from "../ABI/Polynomial_Regression.json";

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

export const NavBar = () => {
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
        
        // Call initialize_dataset
        // try {
        //   console.log("Calling initialize_dataset...");
        //   console.log(contracts);
        //   const tx = await contracts.contractLinearRegression.initialize_dataset(
        //     30,
        //     159400000,
        //     2280090000000,
        //     14321961000000,
        //     1080500000,
        //     195088658122000000n,
        //     [25792200198, 9449962321]
        //   );
        //   console.log("Transaction sent:", tx.hash);
        //   const receipt = await tx.wait();
        //   console.log("Transaction confirmed:", receipt);
        // } catch (initError) {
        //   console.error("Error initializing dataset:", initError);
        // }

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

  const disconnectWallet = () => {
    setAccount("None");
    setState({
      provider: null,
      signer: null,
      contractLinearRegression: null,
      contractLinearSVM: null,
      contractPolynomialRegression: null,
      contractLogRegression: null,
    });
    console.log("Disconnected");
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <h1 className="Logo_text">AUCTIONATOR</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {["home", "projects", "redeem"].map((link) => (
                <Nav.Link
                  key={link}
                  href={`#${link}`}
                  className={activeLink === link ? "active navbar-link" : "navbar-link"}
                  onClick={() => onUpdateActiveLink(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Nav.Link>
              ))}
            </Nav>
            <span className="navbar-text">
              <HashLink to="">
                <button
                  className="vvd"
                  onClick={async () => {
                    if (account === "None") {
                      await connectWallet();
                    } else {
                      disconnectWallet();
                    }
                  }}
                >
                  <span>{account === "None" ? "Connect Wallet" : `Disconnect (${account})`}</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};