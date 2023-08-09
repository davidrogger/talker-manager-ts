type MainTitleProps = {
  title: string,
}

export default function MainTitle({ title }:MainTitleProps) {
  return (
    <h1 className='text-4xl text-center mb-4'>
      {title}
    </h1>
  );
}
