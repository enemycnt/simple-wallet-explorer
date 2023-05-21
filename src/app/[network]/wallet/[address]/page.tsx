import { ethers } from "ethers";
import Link from "next/link";

import { Transaction } from "../../../../types";
import { networksConfig } from "../../../../config";

import TransactionsTable from "./components/TransactionsTable";

export const revalidate = 15;

const getBalance = async (
  address: string,
  network: string
): Promise<string> => {
  const networkConfig = networksConfig[network];
  const url = `https://${networkConfig.explorerHost}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${networkConfig.explorerApiKey}`;
  const rawResponse = await fetch(url);
  const parseResponse = await rawResponse.json();
  return ethers.formatEther(parseResponse.result);
};

const getTransactions = async (
  address: string,
  network: string
): Promise<Array<Transaction>> => {
  const networkConfig = networksConfig[network];
  const url = `https://${networkConfig.explorerHost}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${networkConfig.explorerApiKey}`;
  const rawResponse = await fetch(url);
  const parseResponse = await rawResponse.json();
  return parseResponse.result as Array<Transaction>;
};

export default async function Transactions({
  params,
}: {
  params: { address: string; network: string };
}) {
  const { address, network } = params;
  const walletBallanceData = getBalance(address, network);
  const transactionListData = getTransactions(address, network);
  const [walletBallance, transactionList] = await Promise.all([
    walletBallanceData,
    transactionListData,
  ]);

  return (
    <main className="flex min-h-fit flex-col items-center justify-between p-2 sm:p-4 xl:p-24 ">
      <div className="py-2 self-start space-y-2">
        <Link href="/">{"<- Back home"}</Link>
        <h1 className=" overflow-hidden whitespace-nowrap text-ellipsis">
          Address: {address}
        </h1>
        <h2>Balance: {walletBallance}</h2>
      </div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <TransactionsTable
          transactionList={transactionList}
          network={network}
        />
      </div>
    </main>
  );
}
