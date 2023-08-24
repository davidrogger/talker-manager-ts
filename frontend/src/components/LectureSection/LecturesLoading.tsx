import LectureCardLoading from '@/components/LectureSection/LectureCardLoading';

export default function LecturesLoading() {
  return Array.from({ length: 8 }, (_, key) => (<LectureCardLoading key={key} />));
}
