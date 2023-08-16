type SpinLoadingProps = {
  color?: 'white' | 'black';
  background?: 'inherit'
}

export default function SpinLoading({ color = 'white', background = 'inherit' }:SpinLoadingProps) {
  return (
    <div className={`flex justify-center items-center w-full h-full bg-${background}`}>
      <div
        className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-${color}`}></div>
    </div>
  );
}
