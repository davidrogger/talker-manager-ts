import HeaderBtns from './HeaderBtns';

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

      <HeaderBtns />

    </div>
  );
}

export default Header;
