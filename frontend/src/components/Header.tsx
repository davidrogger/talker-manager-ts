import Link from 'next/link';

function Header() {
  return (
    <div
      data-testid='header-container-id'
      className="flex items-center h-14 bg-slate-500 p-2 justify-between text-white mb-3 shadow-lg"
    >
      <h1
        className='text-2xl'
      >
        Talker Manager
      </h1>

      <Link
        className='relative inline-block hover:after'
        href="/login"
      >
        <span className='hover-underline-animation'>
          Login
        </span>
      </Link>
    </div>
  );
}

export default Header;
