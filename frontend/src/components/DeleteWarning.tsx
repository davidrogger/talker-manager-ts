import { Dispatch, SetStateAction } from 'react';

type DeleteWarningProps = {
  entity: {
    id: string,
    name?: string,
    title?:string,
  },
  setDeleteWarning: Dispatch<SetStateAction<boolean>>,
  setDeleted: Dispatch<SetStateAction<boolean>>,
  deleteEntityById: (id:string) => Promise<void>;
}

export default function DeleteWarning(
  {
    entity,
    setDeleteWarning,
    deleteEntityById,
    setDeleted,
  }: DeleteWarningProps,
) {
  function deleteHandler() {
    deleteEntityById(entity.id);
    setDeleted(true);
    setDeleteWarning(false);
  }

  return (
    <div
      className="absolute top-0 right-0 bg-white w-full h-full flex flex-col justify-center items-center rounded z-10"
    >
      <h1 className="text-red-800 p-0.5">
        Please confirm to exclude:
      </h1>

      <span className="bg-yellow-400 text-red-800 p-0.5 rounded" data-testid='test-highlight-delete-name'>
        {entity.name || entity.title}
      </span>

      <div className=" w-28 [&>*]:m-1 [&>*]:rounded [&>*]:p-0.5 [&>*]:text-white">
        <button className="bg-green-500"
          onClick={deleteHandler}
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
