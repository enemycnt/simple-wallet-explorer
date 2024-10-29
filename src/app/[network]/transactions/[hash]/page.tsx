import { ethers, TransactionReceipt, TransactionResponse, Block } from "ethers";

import { networksConfig } from "../../../../config";

type TransactionDetailed = {
  transactionResponse: TransactionResponse | null;
  block?: Block | null;
  transactionReceipt?: TransactionReceipt | null;
  confirmations?: number;
};

export const revalidate = 60;

const Status = ({ status }: { status: number | null }) => {
  const statusMap: { [key: string]: JSX.Element } = {
    "1": <span className="text-emerald-600 font-bold"> Success</span>,
    "0": <span className="text-rose-600 font-bold"> Fail</span>,
    null: <span className="text-amber-600 font-bold"> Pending</span>,
  };
  const statusKey = status === null ? "null" : status.toString();

  return statusMap[statusKey];
};

const getTransactionDetailed = async (hash: string, network: string) => {
  const networkConfig = networksConfig[network];
  const provider = new ethers.AlchemyProvider(
    networkConfig.chainId,
    networkConfig.alchemyKey
  );
  const transactionResponse = await provider.getTransaction(hash);
  const block = await transactionResponse?.getBlock();
  const transactionReceipt = await transactionResponse?.wait();
  const confirmations = await transactionReceipt?.confirmations();
  const result: TransactionDetailed = {
    transactionResponse,
    block,
    transactionReceipt,
    confirmations,
  };
  return result;
};

export default async function Details(
  props: {
    params: Promise<{ hash: string; network: string }>;
  }
) {
  const params = await props.params;
  const { hash, network } = params;
  const { nativeToken, explorerUrl, explorerName } = networksConfig[network];
  const transactionDetailed = await getTransactionDetailed(hash, network);

  return (
    <main className="flex min-h-screen flex-col items-center p-2 md:pt-24">
      {transactionDetailed && transactionDetailed.transactionResponse && (
        <div className="h-64 w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Hash:
            </h5>
            <a
              href={`${explorerUrl}/tx/${transactionDetailed.transactionResponse.hash}`}
              target="_blank"
              className="text-sm underline font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Go to {explorerName}
            </a>
          </div>
          <pre className="sm:text-xs font-mono overflow-x-hidden text-ellipsis my-2">
            {transactionDetailed.transactionResponse.hash}
          </pre>
          <p className="my-2">
            Amount:{" "}
            {ethers.formatEther(transactionDetailed.transactionResponse.value)}{" "}
            {nativeToken}
          </p>
          {transactionDetailed.block && (
            <p>
              Timestamp:{" "}
              {new Date(
                Number(transactionDetailed.block.timestamp) * 1000
              ).toLocaleString("en-GB")}
            </p>
          )}
          {transactionDetailed.transactionReceipt && (
            <>
              <p className="my-2">
                Status:{" "}
                <Status
                  status={transactionDetailed.transactionReceipt.status}
                />
              </p>
              {transactionDetailed.transactionReceipt.status === 1 ? (
                <p className="my-2">
                  Fee:{" "}
                  {ethers.formatEther(
                    transactionDetailed.transactionReceipt.fee
                  )}{" "}
                  {nativeToken}
                </p>
              ) : null}
            </>
          )}
          {transactionDetailed.confirmations && (
            <p className="my-2">
              Confirmations: {transactionDetailed.confirmations}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
