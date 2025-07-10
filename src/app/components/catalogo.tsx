"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import {getBooks} from "../../api/book";

import { Book } from "@/models/book";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const books = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        if (!data || data.length === 0) {
          setError(true);
        }else {
          setError(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    }

    books();
  }, []);

  useEffect(() => {
    console.log(error)
  }, [error]);

  return (
    // <div className="font-mono flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-emerald-500 to-emerald-900">
    <div className="font-mono flex min-h-screen flex-col items-center justify-between">
      <main className={"flex min-h-screen flex-col items-center gap-5 dark:bg-gray-600"}>
        {/* <header className="z-10 max-w-6xl items-center justify-between font-mono my-3 bg-amber-400 text-amber-50 p-5 rounded"> */}
        <header className="z-10 max-w-6xl items-center justify-between font-mono my-3 p-5">
          <h1 className="text-3xl md:text-6xl font-bold my-3 break-all md:break-words">Welcome to G-Books {error}</h1>
          <p className="animation-typing text-lg md:text-3xl break-all">ਭਉ! ਕੀ ਕਰਨ ਦਿਆ? ਕਿਤਾਬ ਲਭਨ ਦਯਾਨ ਵਾ?{/*  bilkul sehi jaga aya waa, ethe tenu free ch booka parn nu milngya! */}</p>
        </header>

        {error == false && error !== null ?
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-48">
          {books.map((book: Book) => (
            <div key={book.id} className="bg-gray-800 text-white p-3 rounded-lg shadow-lg flex flex-col gap-3 h-fit">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <div className="">
                    <h2 className="text-2xl font-bold">{book.title}</h2>
                  </div>
                  <div className="h-52">
                    <img src={`data:image/jpeg;base64, ${book.cover?.split(',')[1]}`} alt={book.title} className="size-52 object-cover" />
                  </div>
                </div>
                <div className="text-lg text-justify">
                  <p className="text-2xl font-semibold">Description</p>
                  <p>Owner: {book.owner_id ? book.owner_id : "Gurjant Singh"}</p>
                  <p>Author: {book.author}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>Pages: {book.pages}</p>
                  <p>Year: {book.published_year}</p>
                  <p>ID: {book.id}</p>
                </div>
              </div>
              <div>
                {book.available ? <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-semibold bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">Available</span> :
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">Not Available</span>
                }
              </div>
            </div>
          ))}
          </div> :
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-fit mt-0">
            <p className="text-xl">No books available at the moment.</p>
          </div>
        }

        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <div className="grid grid-rows-2 gap-1">
              <div className="h-min">
                <h2 className="text-2xl font-bold">Barkat</h2>
                <Image src="/image/barkat.jpg" alt="Barkat" className="w-full object-contain rotate-180" width={384} height={384} />
              </div>
              <div className="p-3">
                <p className="text-xl max-w-xs">Description</p>
                <p className="text-lg max-w-xs text-justify">
                ਓਸ ਪਿਆਰ ਦੇ ਨਾਂ
                ਜਿਨ੍ਹੇ ਨਫ਼ਰਤਾਂ ਦੇ ਹਨ੍ਹੇਰਿਆਂ ਵਿਚ ਵੀ
                ਜਗਮਗਾਉਣਾ ਹੈ
                ਜੰਗਾਂ ਵਿਚ ਮੁਹੱਬਤ ਦੇ ਗੀਤ ਲਿਖਣੇ ਨੇ
                ਖ਼ਤਾਂ 'ਚ ਪਰੋਏ ਸਬਰ ਨੂੰ
                ਦਿਲ 'ਚ ਸਾਂਭ ਲੈਣਾ ਹੈ
                ਕੱਚਿਆਂ 'ਤੇ ਤਰਨ ਲਈ
                ਜਿਨ੍ਹੇ ਸਦਾ ਪੱਕਦੇ ਰਹਿਣਾ ਹੈ
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <div className="grid grid-rows-2 gap-1">
              <div className="h-min">
                <h2 className="text-2xl font-bold">Chita Lahu</h2>
                <Image src="/image/chita_lahu.jpg" alt="Chita Lahu" className="w-full object-contain" width={384} height={384} />
              </div>
              <div className="p-3">
                <p className="text-xl max-w-xs">Description</p>
                <p className="text-lg max-w-xs text-justify">
                  ਓਸ ਪਿਆਰ ਦੇ ਨਾਂ
                  ਜਿਨ੍ਹੇ ਨਫ਼ਰਤਾਂ ਦੇ ਹਨ੍ਹੇਰਿਆਂ ਵਿਚ ਵੀ
                  ਜਗਮਗਾਉਣਾ ਹੈ
                  ਜੰਗਾਂ ਵਿਚ ਮੁਹੱਬਤ ਦੇ ਗੀਤ ਲਿਖਣੇ ਨੇ
                  ਖ਼ਤਾਂ 'ਚ ਪਰੋਏ ਸਬਰ ਨੂੰ
                  ਦਿਲ 'ਚ ਸਾਂਭ ਲੈਣਾ ਹੈ
                  ਕੱਚਿਆਂ 'ਤੇ ਤਰਨ ਲਈ
                  ਜਿਨ੍ਹੇ ਸਦਾ ਪੱਕਦੇ ਰਹਿਣਾ ਹੈ
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <div className="grid grid-rows-2 gap-1">
              <div className="h-min">
                <h2 className="text-2xl font-bold">Milange Zaroor</h2>
                <Image src="/image/milange_zaroor.jpg" alt="Milange Zaroor" className="w-full object-contain" width={384} height={384} />
              </div>
              <div className="p-3">
                <p className="text-xl max-w-xs">Description</p>
                <p className="text-lg max-w-xs text-justify">
                  ਓਸ ਪਿਆਰ ਦੇ ਨਾਂ
                  ਜਿਨ੍ਹੇ ਨਫ਼ਰਤਾਂ ਦੇ ਹਨ੍ਹੇਰਿਆਂ ਵਿਚ ਵੀ
                  ਜਗਮਗਾਉਣਾ ਹੈ
                  ਜੰਗਾਂ ਵਿਚ ਮੁਹੱਬਤ ਦੇ ਗੀਤ ਲਿਖਣੇ ਨੇ
                  ਖ਼ਤਾਂ 'ਚ ਪਰੋਏ ਸਬਰ ਨੂੰ
                  ਦਿਲ 'ਚ ਸਾਂਭ ਲੈਣਾ ਹੈ
                  ਕੱਚਿਆਂ 'ਤੇ ਤਰਨ ਲਈ
                  ਜਿਨ੍ਹੇ ਸਦਾ ਪੱਕਦੇ ਰਹਿਣਾ ਹੈ
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold">Paviter Papi</h2>
            <Image src="/image/paviter_papi.jpg" alt="Paviter Papi" className="w-full object-contain" width={384} height={384} />
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold">Rani Tatt</h2>
            <Image src="/image/rani_tatt.jpg" alt="Rani Tatt" className="w-full object-contain" width={384} height={384} />
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80">
            <div className="grid grid-rows-2 gap-1">
              <div className="h-min">
                <h2 className="text-2xl font-bold">Tuh Keha Main Maan Lyaa</h2>
                <Image src="/image/tuh_keha_main_maan_lyaa.jpg" alt="Tuh Keha Main Maan Lyaa" className="w-full object-contain" width={384} height={384} />
              </div>
              <div className="p-3">
                <p className="text-xl max-w-xs">Description</p>
                <p className="text-lg max-w-xs text-justify">
                ਚੰਗਾ ਹੋਇਆ ਮੈਂ ਤੇਰੇ ਕੋਲ ਰੁਕ ਗਿਆ ਜ਼ਿੰਦਗੀ ਨੇ ਲੰਘ ਹੀ ਜਾਣਾ ਸੀ।
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  )
}