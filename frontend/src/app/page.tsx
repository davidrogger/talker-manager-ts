import LectureCard from '@/components/LectureCard';
import { getAllLectures } from '@/services/api';
import MainTitle from '@/components/MainTitle';

export default async function Home() {
  const lectures = await getAllLectures(2000);

  return (
    <div>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>
        {lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            {...lecture}
          />
        ))}
      </div>
    </div>
  );
}
