export type Network = {
  explorerName: string;
  explorerUrl: string;
  explorerHost: string;
  explorerApiKey: string;
  alchemyKey: string;
  nativeToken: string;
  chainId: number;
};

export type NetworksConfig = {
  [key: string]: Network;
};

export const networksConfig: NetworksConfig = {
  ethereum: {
    explorerName: "Etherscan",
    explorerUrl: "https://etherscan.io",
    explorerHost: "api.etherscan.io",
    explorerApiKey: process.env.ETHERSCAN_API_KEY!,
    alchemyKey: process.env.ETHEREUM_ALCHEMY_KEY!,
    nativeToken: "ETH",
    chainId: 1,
  },
  polygon: {
    explorerName: "Polygonscan",
    explorerUrl: "https://polygonscan.com",
    explorerHost: "api.polygonscan.com",
    explorerApiKey: process.env.POLYSCAN_API_KEY!,
    alchemyKey: process.env.POLYGON_ALCHEMY_KEY!,
    nativeToken: "MATIC",
    chainId: 137,
  },
};
