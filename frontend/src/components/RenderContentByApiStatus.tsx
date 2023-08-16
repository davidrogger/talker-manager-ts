import { ILecture } from '@/types';
import LecturesDisplay from './LecturesDisplay';
import RefreshBtn from './RefreshBtn';
import LecturesLoading from './LecturesLoading';

type RenderContentByApiStatusProps = {
  status: 'pending' | 'resolved' | 'reject';
  lectures: ILecture[];
}

export default function RenderContentByApiStatus(
  { status, lectures }:RenderContentByApiStatusProps,
) {
  switch (status) {
    case 'pending':
      return (<LecturesLoading />);
    case 'reject':
      return (<RefreshBtn message='Something went wrong!' />);
    case 'resolved':
      return (<LecturesDisplay lectures={lectures} />);
    default:
      return null;
  }
}
