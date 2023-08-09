type LectureCardProps = {
  title: string,
  talkerName: string,
  watchedAt: string,
};

export default function LectureCard({
  talkerName, title, watchedAt,
}:LectureCardProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{talkerName}</p>
      <p>{watchedAt}</p>
    </div>
  );
}
