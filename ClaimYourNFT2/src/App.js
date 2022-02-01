import React from "react";
import "./App.css";
import Web3 from "web3";

class App extends React.Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] })
    var userAddress = accounts[0];

    // token id
    var tokenId = 0; // Insert token id
    var amount = 10; // Insert amount

    // Load smart contract
    const networkId = await web3.eth.net.getId();
    const networkData = MemoryToken.networks[networkId];
    if (networkData) {
      const abi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address"
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool"
            }
          ],
          name: "ApprovalForAll",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address"
            }
          ],
          name: "OwnershipTransferred",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]"
            },
            {
              indexed: false,
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]"
            }
          ],
          name: "TransferBatch",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256"
            }
          ],
          name: "TransferSingle",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "value",
              type: "string"
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "id",
              type: "uint256"
            }
          ],
          name: "URI",
          type: "event"
        },
        {
          inputs: [],
          name: "N0",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256"
            }
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "accounts",
              type: "address[]"
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]"
            }
          ],
          name: "balanceOfBatch",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              internalType: "address",
              name: "operator",
              type: "address"
            }
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              internalType: "uint256[]",
              name: "ids",
              type: "uint256[]"
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            }
          ],
          name: "safeBatchTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            }
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address"
            },
            {
              internalType: "address",
              name: "to",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            }
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address"
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool"
            }
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4"
            }
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address"
            }
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256"
            }
          ],
          name: "uri",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string"
            }
          ],
          stateMutability: "view",
          type: "function"
        }
      ]; // Insert abi
      const address = "0xf9d54299ab0e64cd7212b726fa256174919d68a6"; // Insert address
      const nft = new web3.eth.Contract(abi, address);
      const mint = await nft.methods
        .mint(userAddress, tokenId, amount)
        .send({ from: userAddress });
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          You won this game! Claim Your Prize!
        </header>
        <div className="image-container">
          <img
            src="https://ik.imagekit.io/bayc/assets/ape3.png"
            className="image"
            alt="nft"
          />
        </div>

        <button className="button">Claim NFT</button>
      </div>
    );
  }
}

export default App;
