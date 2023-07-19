import AnimatedLink from '@/components/AnimatedLink';
import InputPass from '@/components/InputPass';
import InputText from '@/components/InputText';

export default function Login() {
  return (
    <div
      className="flex justify-center items-center absolute top-0 bg-zinc-100 h-screen w-screen bg-opacity-80"
    >
      <div
        className="flex flex-col items-center justify-between h-96 w-80 border-2 shadow-md rounded bg-white"
      >
        <h1
          className='text-2xl mt-10'
        >
          Manager Login
        </h1>

        <div className='flex flex-col'>
          <InputText
            placeholder='Email'
          />
          <InputPass
            placeholder='Password'
          />

          <AnimatedLink
            href='/dashboard'
            title='Enter'
            className='w-full text-center'
          />
        </div>

        <AnimatedLink
          href='/'
          title='Back Home'
          className='self-start m-2 text-blue-500'
        />
      </div>
    </div>
  );
}
