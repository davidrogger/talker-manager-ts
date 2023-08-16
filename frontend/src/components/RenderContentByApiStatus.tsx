import { ApiStatus, ILecture } from '@/types';
import LecturesDisplay from './LecturesDisplay';
import RefreshBtn from './RefreshBtn';
import LecturesLoading from './LecturesLoading';

type RenderContentByApiStatusProps = {
  status: ApiStatus;
  lectures: ILecture[];
}

export default function RenderContentByApiStatus(
  { status, lectures }:RenderContentByApiStatusProps,
) {
  switch (status) {
    case ApiStatus.PENDING:
      return (<LecturesLoading />);
    case ApiStatus.REJECTED:
      return (<RefreshBtn message='Something went wrong!' />);
    case ApiStatus.RESOLVED:
      return (<LecturesDisplay lectures={lectures} />);
    default:
      return null;
  }
}
