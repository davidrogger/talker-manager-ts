import { useAuthContext } from '@/contexts/Auth';
import editImg from '@/images/edit.svg';
import trashImg from '@/images/trash.svg';
import RequestBtn from './RequestBtn';

export default function LectureBtns() {
  const { isAuthenticated } = useAuthContext();

  async function editHandle() {
    //
  }

  if (isAuthenticated) {
    return (
  <div className='flex justify-between absolute bottom-0 left-0 w-full p-2'>
    <RequestBtn
      alt='edit'
      onClick={editHandle}
      src={editImg}
    />
    <RequestBtn
      alt='delete'
      onClick={editHandle}
      src={trashImg}
    />
  </div>
    );
  }
}
