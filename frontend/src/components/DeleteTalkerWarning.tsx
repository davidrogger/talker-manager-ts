import { Dispatch, SetStateAction } from 'react';

type DeleteTalkerWarningProps = {
  talkerName: string,
  setDeleteWarning: Dispatch<SetStateAction<boolean>>,
}

export default function DeleteTalkerWarning(
  {
    talkerName,
    setDeleteWarning,
  }: DeleteTalkerWarningProps,
) {
  return (
    <div
      className="absolute top-0 right-0 bg-white w-full h-full flex justify-center items-center rounded"
    >
      <h1 className="text-red-800 p-0.5">
        Please confirm to exclude:
      </h1>

      <span className="bg-yellow-400 text-red-800 p-0.5 rounded" data-testid='test-highlight-delete-name'>
        {talkerName}
      </span>

      <div className=" w-28 [&>*]:m-1 [&>*]:rounded [&>*]:p-0.5 [&>*]:text-white">
        <button className="bg-green-500">
          Yes
        </button>
        <button
          className="bg-red-800"
          onClick={() => setDeleteWarning(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}
