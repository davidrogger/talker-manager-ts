import { useDashboardContext } from '@/contexts/Dashboard';
import { deleteTalkerById } from '@/services/api';
import { ITalker } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type DeleteTalkerWarningProps = {
  talker: ITalker,
  setDeleteWarning: Dispatch<SetStateAction<boolean>>,
}

export default function DeleteTalkerWarning(
  {
    talker,
    setDeleteWarning,
  }: DeleteTalkerWarningProps,
) {
  const { loadTalkers } = useDashboardContext();

  function deleteTalkerHandler() {
    deleteTalkerById(talker.id);
    loadTalkers();
    setDeleteWarning(false);
  }

  return (
    <div
      className="absolute top-0 right-0 bg-white w-full h-full flex justify-center items-center rounded"
    >
      <h1 className="text-red-800 p-0.5">
        Please confirm to exclude:
      </h1>

      <span className="bg-yellow-400 text-red-800 p-0.5 rounded" data-testid='test-highlight-delete-name'>
        {talker.name}
      </span>

      <div className=" w-28 [&>*]:m-1 [&>*]:rounded [&>*]:p-0.5 [&>*]:text-white">
        <button className="bg-green-500"
          onClick={deleteTalkerHandler}
        >
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
