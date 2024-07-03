# UI Project

This Next.js project demonstrates using [Threshold TACo](https://docs.threshold.network/applications/threshold-access-control), in combination with [Irys for permanent storage](https://docs.irys.xyz/) to implement token gating. The project gates access to 5 images based on token ownership.

## Setup

1. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

2. Rename `.env.example` to `.env`. The example file is pre-filled with some values:

```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="0x0e015827278f1bC4fA8d155fD7E83668A892507d"
NEXT_PUBLIC_NFT_METADATA_ADDRESS="https://gateway.irys.xyz/Nk8ZZwM1XMrGXvhaqnKRPXY6nglGYt5DIAxo1d81JiE"
NEXT_PUBLIC_SEPOLIA_RPC=""
NEXT_PUBLIC_AMOY_RPC_URL="https://rpc-amoy.polygon.technology."
```

You can leave the first two values unchanged if you are not deploying the NFT on your own. If you are deploying your own NFT, change those values accordingly.

## Running the Project

```bash
npm run dev
```

or

```bash
yarn dev
```

## Token Gating

This UI project gates access to the following 5 images, which are hardcoded in `./app/(pages)/album/page.tsx`:

```ts
const images = [
	{ src: "yvM5pF5-jE74zVluJtMAad6mBKjyw9yAXORM_2hnM_Y", isHorizontal: true },
	{ src: "xgvDnf75NcYD3l5MHZb1g9wG3Hf348x4ncYzZDx8kyA", isHorizontal: true },
	{ src: "3e2-MzgDCDjT6Tm79Yzb3fXkx7rSvAihInXP86Utkoc", isHorizontal: true },
	{ src: "YT-_JryldDuo590bv80ptsi65lsfgbBysAXJVU0VDzI", isHorizontal: false },
	{ src: "GnkRcbZlxd-gAIcNNzh8OYXni0-Iva-_VJDv2F74UvI", isHorizontal: true },
];
```

For more details, refer to the code in the respective files.
