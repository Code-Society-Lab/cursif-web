
interface SearchBarInterface {
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
export default function SearchBar(props: SearchBarInterface) {

    return (
        <div className="grow">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input onChange={props.onChange} type="search" id="default-search"
                className="block w-full p-2 pl-10 text-sm rounded-lg 
                bg-component focus:ring-blue-500 " placeholder="Search"/>
        </div>
        </div>
    )

}