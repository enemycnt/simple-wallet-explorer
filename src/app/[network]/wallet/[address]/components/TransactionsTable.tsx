"use client";
import { useState, useMemo } from "react";
import { ethers } from "ethers";
import Link from "next/link";

import { Transaction } from "../../../../../types";
import { networksConfig } from "../../../../../config";

const FilterIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3 ml-1"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 320 512"
  >
    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
  </svg>
);

export default function TransactionTable({
  transactionList,
  network,
}: {
  transactionList: Array<Transaction>;
  network: string;
}) {
  const [sortProp, setSortProp] = useState<string>();

  const { nativeToken } = networksConfig[network];

  const transactions = useMemo(() => {
    if (sortProp) {
      const [prop, order] = sortProp.split("-");
      return [...transactionList].sort((a, b) => {
        if (order === "asc") {
          return Number(a[prop as keyof Transaction]) <
            Number(b[prop as keyof Transaction])
            ? 1
            : -1;
        } else {
          return Number(b[prop as keyof Transaction]) <
            Number(a[prop as keyof Transaction])
            ? 1
            : -1;
        }
      });
    }
    return transactionList;
  }, [sortProp, transactionList]);

  return (
    <table className="table-fixed lg:table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Hash
          </th>
          <th scope="col" className="px-6 py-3">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                sortProp === "value-asc"
                  ? setSortProp("value-desc")
                  : setSortProp("value-asc");
              }}
            >
              Amount <FilterIconSvg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                sortProp === "timeStamp-asc"
                  ? setSortProp("timeStamp-desc")
                  : setSortProp("timeStamp-asc");
              }}
            >
              Time
              <FilterIconSvg />
            </div>
          </th>
          <th scope="col" className="w-10 sm:w-24"></th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((transaction: Transaction) => {
            return (
              <tr
                key={transaction.hash}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-1 font-mono md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-ellipsis overflow-hidden">
                  <Link
                    href={{
                      pathname: `${network}/transactions/${transaction.hash}`,
                    }}
                  >
                    {transaction.hash}
                  </Link>
                </td>
                <td className="px-1 md:px-6 py-4 text-ellipsis overflow-hidden">
                  <>
                    {console.log(
                      "🚀 ~ file: TransactionsTable.tsx:107 ~ transaction.value:",
                      transaction.value
                    )}
                    {`${ethers.formatEther(transaction.value)} ${nativeToken}`}
                  </>
                </td>
                <td className="px-1 md:px-6 py-4">
                  {new Date(
                    Number(transaction.timeStamp) * 1000
                  ).toLocaleString("en-GB")}
                </td>
                <td className="">
                  <Link
                    className="underline"
                    href={{
                      pathname: `${network}/transactions/${transaction.hash}`,
                    }}
                  >
                    Show
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
