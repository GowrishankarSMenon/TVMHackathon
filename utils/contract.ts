import { ethers } from "ethers";
import abi from "../blockchain/artifacts/contracts/SimpleCrimeReporting.sol/SimpleCrimeReporting.json"

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = abi.abi;

export const getContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ Get the signer explicitly
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // ✅ Attach signer
};
