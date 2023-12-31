import Link from 'next/link';

type AnimatedProps = {
  title: string,
  testId?: string,
  href: string,
  className?: string,
  underlineColor?: string,
}

function AnimatedLink({
  title, testId, href, className, underlineColor = 'black',
}: AnimatedProps) {
  return (
    <Link
    data-testid={ testId }
    className={`relative inline-block opacity-50 ${className} hover:after hover:opacity-100`}
    href={ href }
  >
    <span className={`hover-underline-animation after:bg-${underlineColor}`}>
      { title }
    </span>
  </Link>
  );
}

export default AnimatedLink;
