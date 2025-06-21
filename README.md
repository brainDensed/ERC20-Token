# FoolishToken Hardhat Project

This project contains the smart contract, tests, and deployment scripts for the FoolishToken ERC20 token, built with Hardhat and OpenZeppelin.

## Features

- ERC20 token with name `BonerToken` and symbol `BONER`
- Mint, burn, pause, and unpause functionality (owner only)
- Hardhat Ignition module for deployment
- Automated tests

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
NETWORK_URL=YOUR_SEPOLIA_RPC_URL
PRIVATE_KEY=YOUR_DEPLOYER_PRIVATE_KEY
```

### 3. Compile Contracts

```bash
npx hardhat compile
```

### 4. Run Tests

```bash
npx hardhat test
```

### 5. Deploy to Sepolia (or another network)

Update the network config in `hardhat.config.js` if needed.

```bash
npx hardhat ignition deploy ./ignition/modules/BonerToken.js --network sepolia
```

The deployed contract address will be printed in the output.

## Project Structure

```
contracts/         # Solidity smart contracts
test/              # Contract tests
ignition/modules/  # Hardhat Ignition deployment modules
artifacts/         # Build output (auto-generated)
cache/             # Build cache (auto-generated)
```

## Useful Hardhat Commands

```bash
npx hardhat help
npx hardhat compile
npx hardhat test
npx hardhat ignition deploy ./ignition/modules/BonerToken.js --network sepolia
```

## Frontend

The frontend for this project is available at: [ERC20-token-client](https://github.com/brainDensed/ERC20-Token-Client)

## Frontend Integration

- Copy the ABI from `artifacts/contracts/BonerToken.sol/BonerToken.json` to your frontend project.
- Use the deployed contract address in your frontend.


## License

This project is licensed under the MIT License.