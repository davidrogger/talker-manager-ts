import confirmImg from '@/images/confirm.svg';
import cancelImg from '@/images/cancel.svg';

import RequestBtn from './RequestBtn';

type EditableModeBtnsProps = {
  confirmHandle: () => void;
  cancelHandle: () => void;
  isConfirmDisabled?: boolean;
}

export default function EditableModeBtns(
  { confirmHandle, cancelHandle, isConfirmDisabled }:EditableModeBtnsProps,
) {
  return (
    <>
      <RequestBtn
        alt='confirm'
        onClick={confirmHandle}
        src={confirmImg}
        disabled={isConfirmDisabled}
      />
      <RequestBtn
        alt='cancel'
        onClick={cancelHandle}
        src={cancelImg}
      />
    </>
  );
}
