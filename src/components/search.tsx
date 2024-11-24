'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // console.log('Searching for:', term);

    const params = new URLSearchParams(searchParams ?? undefined);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="mt-16 md:mt-20">
      <label htmlFor="search" className="sr-only">Search</label>
      <input type="text" className="w-full md:w-[30rem] bg-gray-300 p-2 rounded-3xl mb-4 text-center placeholder:text-center mx-auto block dark:text-black" placeholder={placeholder} onChange={e => {
        handleSearch(e.target.value)
      }}
        defaultValue={searchParams?.get('query')?.toString()} />
    </div>
  )
}



