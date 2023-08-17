import { ApiStatus, ILecture } from '@/types';
import LecturesDisplay from './LecturesDisplay';
import RefreshWindow from './RefreshWindow';
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
      return (<RefreshWindow message='Something went wrong!' />);
    case ApiStatus.RESOLVED:
      return (<LecturesDisplay lectures={lectures} />);
    default:
      return null;
  }
}
