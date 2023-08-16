import LectureCardLoading from '@/components/LectureCard-loading';

export default function LecturesLoading() {
  return Array.from({ length: 8 }, (_, key) => (<LectureCardLoading key={key} />));
}
