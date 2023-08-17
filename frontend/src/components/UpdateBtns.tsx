import RequestBtn from '@/components/RequestBtn';

import editImg from '@/images/edit.svg';
import trashImg from '@/images/trash.svg';

type UpdateBtnsProps = {
  editHandle: () => void;
  deleteHandle: () => void;
}

export default function UpdateBtns(
  { editHandle, deleteHandle }:UpdateBtnsProps,
) {
  return (
    <>
      <RequestBtn
        alt='edit'
        onClick={editHandle}
        src={editImg}
      />
      <RequestBtn
        alt='delete'
        onClick={deleteHandle}
        src={trashImg}
      />
    </>
  );
}
