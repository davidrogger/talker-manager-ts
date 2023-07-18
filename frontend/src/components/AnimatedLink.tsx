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
    className={`relative inline-block hover:after ${className}`}
    href={ href }
  >
    <span className={`hover-underline-animation after:bg-${underlineColor}`}>
      { title }
    </span>
  </Link>
  );
}

export default AnimatedLink;
