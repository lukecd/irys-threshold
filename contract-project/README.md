# IrysThresholdKey NFT Smart Contract

This sub-project contains a simple NFT contract for a single NFT, which can be used as part of the encryption and decryption demo.

## Contract Overview

The [`IrysThresholdKey`](./contract/IrysThresholdKey.sol) contract allows anyone to mint an NFT, provided they can pay the gas fees. The contract includes basic functionality for minting and querying the token URI.

## Additional Files

- [`nft-image.jpg`](./assets/nft-image.jpg): Image associated with the NFT.
- [`nft-metadata.json`](./assets/nft-metadata.json): Metadata for the NFT.

## Usage

Users have two options:

1. Deploy the NFT smart contract to any chain to personalize the demo.
2. Use the existing deployment on Polygon Amoy at `0x0e015827278f1bC4fA8d155fD7E83668A892507d` to run the existing demo.

## Deployment Instructions

### Deploying with Remix

1. Open [Remix](https://remix.ethereum.org/).
2. Create a new file and paste the contract code above.
3. Compile the contract.
4. Deploy the contract:
   - Select Injected Web3 for MetaMask (or any wallet).
   - Ensure you have enough funds to cover gas fees.
   - Click the "Deploy" button.

Once deployed, you can mint NFTs using the `safeMint` function available in the deployed contract.

For more details, refer to the [OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/4.x/erc721).
