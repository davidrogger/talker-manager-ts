import { ILecture } from '@/types';

import { useAuthContext } from '@/contexts/Auth';

import LectureCard from '@/components/LectureSection/LectureCard';
import LectureCardPlus from '@/components/LectureSection/LectureCardPlus';

type LecturesDisplayProps = {
  lectures: ILecture[];
}

export default function LecturesDisplay({ lectures }:LecturesDisplayProps) {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      {lectures.map((lecture) => (
    <LectureCard
      key={lecture.id}
      lecture={lecture}
    />
      ))}
      {isAuthenticated && <LectureCardPlus />}
    </>
  );
}
