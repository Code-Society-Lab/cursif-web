import Spinner from './spinner';

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className='w-[35px] h-[35px]' />
    </div>
  );
}