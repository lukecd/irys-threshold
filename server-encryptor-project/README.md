# Project Overview

This repository contains TypeScript Node.js scripts that demonstrate encryption and decryption processes using [Threshold TACo](https://docs.threshold.network/applications/threshold-access-control), in combination with [Irys for permanent storage](https://docs.irys.xyz/). There are two primary scripts:

1. [`threshold-lifecycle.ts`](./scripts//threshold-lifecycle.ts): Demonstrates the full lifecycle of encrypting a string, uploading it to Irys, downloading it, and then decrypting it.
2. [`image-encrypt-upload.ts`](./scripts/image-encrypt-upload.ts): Encrypts PNG images from a directory and uploads them to Irys.

## Setup

1. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

2. Rename `.env.example` to `.env` and add your private key:

```
PRIVATE_KEY=
```

## Scripts

### 1. threshold-lifecycle.ts

This script demonstrates the entire lifecycle of data encryption, uploading to Irys, downloading, and decryption.

#### Running the Script

```bash
ts-node scripts/threshold-lifecycle.ts
```

### 2. image-encrypt-upload.ts

This script encrypts all PNG images in the `source-images` directory and uploads them to Irys.

#### Running the Script

```bash
ts-node scripts/image-encrypt-upload.ts
```

## Code Overview

### `threshold-lifecycle.ts`

- **Encrypts a string**: Encrypts the message "Top secret".
- **Uploads encrypted data**: Uploads the encrypted message to Irys.
- **Downloads encrypted data**: Downloads the encrypted message from Irys.
- **Decrypts the data**: Decrypts the downloaded message.

### `image-encrypt-upload.ts`

- **Encrypts PNG images**: Reads all PNG files in the `source-images` directory, encrypts them, and uploads them to Irys.

Both scripts use Threshold TACo for encryption and decryption, and Irys permanent data.

For more details, refer to the code in the respective scripts.

## Rule-Based Encryption

Threshold Access Control (TACo) involves splitting a joint secret – a decryption key – into multiple shares and distributing those among authorized and collateralized node operators (stakers in the Threshold network). A minimum number – a threshold – of those operators holding the key shares must be online and actively participate in partial decryptions. These are subsequently combined on the requester's client to reconstruct the original plaintext data.

### Conditional Access

Conditions can be attached on a per-ciphertext basis, allowing each payload to be access-restricted by a unique set of specified conditions. In this example, we define an access condition based on the ownership of an NFT:

```typescript
const OWNS_NFT = new conditions.predefined.erc721.ERC721Balance({
	contractAddress: "0x0e015827278f1bC4fA8d155fD7E83668A892507d",
	chain: 80002,
	returnValueTest: {
		comparator: ">",
		value: 0,
	},
});
```

This condition checks if the requester owns a specific NFT. If the condition is met, the requester can proceed with the decryption process.

### Example Usage

In the provided scripts, the `OWNS_NFT` condition is used to encrypt data such that only users who own the specified NFT can decrypt it. This ensures that sensitive information is only accessible to authorized users.

For more details, refer to the code and the [TACo docs](https://threshold.network/docs/taco) and [Irys docs](https://docs.irys.xyz).
