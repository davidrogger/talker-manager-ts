import { ApiStatus } from '@/types';

import { useLectureContext } from '@/contexts/Lectures';

import LecturesLoading from '@/components/LectureSection/LecturesLoading';
import LecturesDisplay from '@/components/LectureSection/LecturesDisplay';
import RefreshWindow from '@/components/RefreshWindow';

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
