import { ILecture } from '@/types';
import LectureCard from './LectureCard';

type LecturesDisplayProps = {
  lectures: ILecture[];
}

export default function LecturesDisplay({ lectures }:LecturesDisplayProps) {
  return lectures.map((lecture) => (
    <LectureCard
      key={lecture.id}
      {...lecture}
    />
  ));
}
