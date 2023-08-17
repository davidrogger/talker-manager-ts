import LectureBtns from './LectureBtns';

type LectureCardProps = {
  title: string,
  talkerName: string,
  watchedAt: string,
};

export default function LectureCard({
  talkerName, title, watchedAt,
}:LectureCardProps) {
  return (
    <div
      className="relative flex flex-col justify-between m-4 border rounded w-52 h-32 p-4 text-center shadow-lg hover:shadow-xl"
    >
      <h1 className="text-lg text-red-800 whitespace-nowrap overflow-hidden">{title}</h1>
      <p>{talkerName}</p>
      <p className="opacity-50">{watchedAt}</p>

      <LectureBtns />
    </div>
  );
}
