import LectureCardLoading from '@/components/LectureCard-loading';
import { createEmptyList } from '@/utils';

export default function LecturesLoading() {
  const squeleton = createEmptyList(12);

  return squeleton.map((key) => (<LectureCardLoading key={key} />));
}
