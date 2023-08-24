const tailwindColors: Record<string, string> = {
  white: 'white',
  black: 'black',
  green: 'green-500',
};

type colors = 'inherit' | 'green' | 'white' | 'black' | 'green';

type SpinLoadingProps = {
  color?: colors;
  background?: colors;
}

export default function SpinLoading({ color = 'white', background = 'inherit' }:SpinLoadingProps) {
  return (
    <span className={`absolute top-0 left-0 flex justify-center items-center w-full h-full bg-${tailwindColors[background]}`}>
      <span
        className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-${tailwindColors[color]}`}></span>
    </span>
  );
}
