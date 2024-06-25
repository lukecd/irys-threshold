# Irys CLI Demo

This repository demonstrates how to use the Irys CLI to upload an NFT image and metadata, deploy a smart contract on Sepolia using Remix, and embed the Token URI in the contract.

## Prerequisites

- Node.js (latest version)
- Irys CLI
- Remix IDE
- Wallet with funds for Sepolia network

## Installation

Install the Irys CLI globally. Depending on your setup, you may or may not need to use `sudo`.

```bash
npm i -g @irys/sdk
# or
sudo npm i -g @irys/sdk
```

## Steps

### 1. Use Irys CLI to Upload `nft-image.png`

Upload your NFT image:

```bash
irys upload nft-image.png -n mainnet -t ethereum -w <your-ethereum-private-key>
```

After uploading, you will receive a URL for your image. Copy this URL as it will be used in the next step.

### 2. Embed Results in `nft-metadata.json`

Create a file named `nft-metadata.json` and add the following content, replacing `YOUR_IMAGE_URL` with the URL you received:

[Link to nft-metadata.json file](./nft-metadata.json)

### 2.5. Upload `nft-metadata.json` with Irys CLI

Upload your metadata file:

```bash
irys upload nft-metadata.json -n mainnet -t ethereum -w <your-ethereum-private-key>
```

After uploading, you will receive a URL for your metadata file. Copy this URL as it will be used in the smart contract.

### 3. Deploy `IrysThresholdKey.sol` Using Remix on Sepolia

Open Remix IDE and create a new file named `IrysThresholdKey.sol`. Copy the code from the following link into the file:

[Link to IrysThresholdKey.sol file](./IrysThresholdKey.sol)

### 4. Embed Token URI in Contract When Calling Constructor

In Remix, go to the "Deploy & Run Transactions" tab, select "Injected Web3" as the environment, and ensure you're connected to the Sepolia network.

Deploy the contract with the following parameters:

- `initialOwner`: Your Ethereum address
- `baseURI`: URL of the uploaded `nft-metadata.json` (e.g., `https://gateway.irys.xyz/YOUR_METADATA_FILE_URL`)

```solidity
new IrysThresholdKey("YOUR_ETHEREUM_ADDRESS", "https://gateway.irys.xyz/YOUR_METADATA_FILE_URL")
```

### Congratulations!

You've successfully uploaded an NFT image and metadata using the Irys CLI, deployed a smart contract on Sepolia using Remix, and embedded the Token URI in the contract.

## Resources

- [Irys CLI Documentation](https://docs.irys.io/cli)
- [Remix IDE](https://remix.ethereum.org/)
- [Sepolia Network on Chainlist](https://chainlist.org/)

## Support

If you encounter any issues, please reach out on our [Discord](https://discord.gg/irys) or [Twitter](https://twitter.com/irys).
