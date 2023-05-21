"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [network, setNetwork] = useState<string>("ethereum");
  const [address, setAddress] = useState<string>(
    "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990"
  );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/${network}/wallet/${address}`);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="w-full max-w-2xl" onSubmit={(e) => submit(e)}>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Paste
          </span>{" "}
          an address!
        </h1>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="text-base appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none dark:text-white"
            type="text"
            id="address"
            name="address"
            placeholder="0x..."
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <div className="inline-block relative w-48 py-1 mx-2">
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="focus:outline-none bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-emerald-500 appearance-none"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
            Show me
          </button>
        </div>
      </form>
    </main>
  );
}
