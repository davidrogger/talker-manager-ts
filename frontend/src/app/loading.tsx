import LectureCardLoading from '@/components/LectureCard-loading';
import MainTitle from '@/components/MainTitle';
import { createEmptyList } from '@/utils';

export default async function HomeLoading() {
  const squeleton = createEmptyList(12);

  return (
    <div>
      <MainTitle title='Home' />
      <div className='flex flex-wrap content-start justify-center pt-8 h-[calc(100vh-112px)] bg-gray-100'>
        {squeleton.map((key) => <LectureCardLoading key={key} />)}
      </div>
    </div>
  );
}
