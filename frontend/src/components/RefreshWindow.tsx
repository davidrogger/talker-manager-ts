'use client';

import { useRouter } from 'next/navigation';

type IRefreshBtnProps = {
  message: string,
}

export default function RefreshWindow({ message }:IRefreshBtnProps) {
  const router = useRouter();

  function refreshHandler() {
    router.refresh();
  }

  return (
    <div className="bg-white flex flex-col justify-between items-center rounded p-5">
      <p className="text-red-600 text-center">
        {message}
      </p>
      <button
        className="mt-4 bg-green-600 p-2 rounded text-white hover:bg-green-700 active:translate-y-1"
        onClick={refreshHandler}
      >
        Refresh
      </button>
    </div>
  );
}
