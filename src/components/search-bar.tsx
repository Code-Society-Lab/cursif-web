import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarInterface {
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
export default function SearchBar(props: SearchBarInterface) {

  return (
    <div className="grow">
      <label htmlFor="default-search" className="pt-2 text-sm font-medium sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className='w-4 h-4 text-gray-500' />
        </div>
        <input onChange={props.onChange} type="search" id="default-search"
          className="block w-full pt-[8px] pb-[6px] pl-8 text-sm rounded-lg 
                    bg-component focus:ring-blue-500 " placeholder="Search" />
      </div>
    </div>
  )

}