import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type TalkerBtnProps = {
  src: StaticImport,
  alt: string,
  disabled?: boolean,
  onClick: () => void,
}

export default function TalkerBtn({
  src, alt, onClick, disabled = false,
}:TalkerBtnProps) {
  return (
    <button
    className='w-8 h-8 p-1 disabled:opacity-50 disabled:cursor-not-allowed focus:active:translate-y-0.5'
    data-testId={`test-${alt}-button`}
    onClick={onClick}
    disabled={disabled}
  >
  <Image
    src={src}
    alt={`image-${alt}-button`}
  />
  </button>
  );
}
