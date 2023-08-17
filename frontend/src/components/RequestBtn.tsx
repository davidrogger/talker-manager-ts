import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type RequestBtnProps = {
  src: StaticImport,
  alt: string,
  disabled?: boolean,
  onClick: () => void,
}

export default function RequestBtn({
  src, alt, onClick, disabled = false,
}:RequestBtnProps) {
  return (
    <button
    className='relative w-6 h-6 p-1 disabled:opacity-50 disabled:cursor-not-allowed focus:active:translate-y-0.5'
    data-testid={`test-${alt}-button`}
    onClick={onClick}
    disabled={disabled}
  >
  <Image
    className='absolute w-full h-full rounded bottom-0 left-0 hover:-translate-y-1 transition'
    src={src}
    alt={`image-${alt}-button`}
  />
  </button>
  );
}
