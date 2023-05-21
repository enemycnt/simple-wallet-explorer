<image width="600" src="/public/screen.png" alt="screen">

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Use the following wallet address to test the application: `0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990` for ethereum and `0xeC20607aa654D823DD01BEB8780a44863c57Ed07` for polygon.

To run application locally you need to create `.env.local` file with following variables:

```
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
ETHEREUM_ALCHEMY_KEY="YOUR_ALCHEMY_API_KEY"

POLYSCAN_API_KEY="YOUR_POLYSCAN_API_KEY"
POLYGON_ALCHEMY_KEY="YOUR_POLYGON_ALCHEMY_API_KEY"
```

Deployed version avaliable at https://simple-wallet-explorer.vercel.app/

## Description
This application employs the new `App Router` scheme as a replacement for the traditional `pages` folder. It also utilizes a combination of server-side and client-side components, leveraging the main features of the latest Next.js version.

The Tailwind CSS framework has been chosen for styling since Material UI (MUI) and Chakra UI are not currently compatible with React server components.

To retrieve the list of transactions for a wallet address, the application uses the public APIs provided by Etherscan and Polyscan. For acquiring specific transaction data, Alchemy RPC nodes are queried.


What can be improved:
- unit and e2e tests
- better error handling
- better UI with MUI or Chakra UI
- `react-data-table-component` instead of custom table
- `react-hook-form` instead of custom form




