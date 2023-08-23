import { ApiStatus } from '@/types';
import { useLectureContext } from '@/contexts/Lectures';
import LecturesDisplay from './LecturesDisplay';
import RefreshWindow from './RefreshWindow';
import LecturesLoading from './LecturesLoading';

export default function RenderContentByApiStatus() {
  const { lectureApiStatus, displayedLectures } = useLectureContext();
  switch (lectureApiStatus) {
    case ApiStatus.PENDING:
      return (<LecturesLoading />);
    case ApiStatus.RESOLVED:
      return (<LecturesDisplay lectures={displayedLectures} />);
    default:
      return (<RefreshWindow message='Something went wrong!' />);
  }
}
