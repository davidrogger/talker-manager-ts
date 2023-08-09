type MainTitleProps = {
  title: string,
}

export default function MainTitle({ title }:MainTitleProps) {
  return (
    <h1 className='text-4xl text-center p-2 bg-gray-200'>
      {title}
    </h1>
  );
}
