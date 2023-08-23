export default function LectureCardLoading() {
  return (
    <div
      className="flex flex-col justify-between items-center m-4 border rounded w-52 h-32 p-4 text-center shadow-lg hover:shadow-xl animate-pulse"
    >
      <div className="bg-gray-200 h-7 w-full whitespace-nowrap overflow-hidden rounded"></div>
      <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  );
}
