const { ethers } = require("hardhat");

async function main() {
    // Get the contract factory
    const CrimeReporting = await ethers.getContractFactory("SimpleCrimeReporting");

    // Deploy the contract
    const crimeReporting = await CrimeReporting.deploy();

    // Wait for deployment to complete
    await crimeReporting.deployed();

    console.log(`🚀 Contract deployed at: ${crimeReporting.address}`);
}

// Run the script and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
