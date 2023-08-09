import LectureCard from '@/components/LectureCard';
import { getAllLectures } from '@/services/api';
import MainTitle from '@/components/MainTitle';
import RefreshBtn from '@/components/RefreshBtn';

export default async function Home() {
  const { lectures } = await getAllLectures();

  return (
    <div>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>
        {lectures
          ? (lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            {...lecture}
          />
          )))
          : (<RefreshBtn message='Something went wrong!' />)}
      </div>
    </div>
  );
}
