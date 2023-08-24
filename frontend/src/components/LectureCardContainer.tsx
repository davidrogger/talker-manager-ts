import { ReactNode } from 'react';

export default function LectureCardContainer({ children }:{children:ReactNode}) {
  return (
    <div
      className="relative flex flex-col justify-between items-center m-4 border rounded w-52 h-32 p-4 text-center shadow-lg hover:shadow-xl"
    >
      { children }
    </div>
  );
}
