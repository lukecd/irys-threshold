TO ADD

- When the encrypter becomes user's devices you get end-to-end encryption

# Project Overview

TODO: Add screenshot

This project uses [Threshold TACo](https://docs.threshold.network/) and [Irys](https://docs.irys.xyz/) to build a decentralized token gating system.

Five images are encrypted with TACo and stored permanently on-chain using Irys. To decrypt the images, users must sign a transaction proving they own with a specific NFT. For the demo, the NFT can be minted for free by anyone, although you will need some SEPOLIA ETH to cover gas fees.

## Sub-projects

- `/server-encryptor` - A NodeJS script that encrypts images from the local drive. Can be customized to encrypt any data.
- `/contract` - The NFT smart contract. Wallets that own this NFT can decrypt the images.
- `/ui`- The token gating UI. The UI is open to anyone, but the content can only be decrypted by NFT holders.

## Token-Gating

Token gating ensures that only individuals possessing a specific NFT or ERC20 token can access certain content. Unlike traditional token-gating platforms that restrict access to a centralized UI, decentralized environments require a different approach. In a decentralized setup where content is stored on-chain and publicly accessible, locking the UI is ineffective as users can directly access the on-chain content.

For decentralized token gating, data must be encrypted before storing it on-chain. Only token holders should be able to decrypt this data, ensuring that unauthorized users cannot access the content even if they manage to bypass the UI restrictions.

## Benefits of Decentralized Token Gating

- **Enhanced Security**: Encrypting data ensures that only authorized token holders can access the content, maintaining privacy and security.
- **Decentralized Control**: No reliance on a central authority to manage access.
- **Permanent Access**: Encrypted data stored on-chain can remain accessible to token holders indefinitely, ensuring long-term data availability.

## TACo (Threshold Access Control)

TACo enables end-to-end encrypted data sharing and communication without requiring trust in a centralized authority. It achieves this by distributing sensitive cryptographic operations across a network of independent nodes. This decentralized approach ensures that:

- **Key Generation and Decryption**: These processes are handled by a distributed set of machines, reducing the risk of a single point of failure or unauthorized access.
  Access Control: Only users who meet specific conditions (e.g., owning a particular NFT) can access the decryption keys, providing fine-grained control over data access.
- **Low Latency**: TACo's low-latency decryption flow ensures rapid access to encrypted data, making it practical for real-time applications.

## Irys

Irys enables permanent onchain data. Data on Irys is permanent, precise, and unconstrained.

- **Permanent**: Data stored on Irys is censorship-resistant and immutable. There's no counterparty risk of data being removed.
- **Precise**: Data is timestamped with a high-precision timestamp, providing a reliable sequence of events.
- **Unconstrained**: There are no limits on file upload sizes. Users can always read, write, and discover data at scale.

Irys offers near-instantaneous uploads. After uploading, the data is immediately available for download.

By integrating TACo with Irys, users can leverage Irys' fast upload and data egress capabilities alongside TACo's secure encryption and decryption, ensuring that sensitive data remains private and accessible only to those with the appropriate tokens. This combination offers a robust solution for secure, decentralized token gating in various applications.
