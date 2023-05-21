
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center  md:pt-24">
      <div className="h-64 w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></p>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></p>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></p>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></p>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></p>
          <p className="my-3 h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></p>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </main>
  );
}
