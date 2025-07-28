"use client";

export default function Book() {
  return (
    <div className="font-mono flex min-h-screen flex-col items-center justify-between cus-dark-bg">
      <main className="flex min-h-screen flex-col items-center gap-5 text-white">
        <header className="z-10 max-w-6xl items-center justify-between font-mono my-3 p-5">
          <h1 className="text-3xl md:text-6xl font-bold my-3 break-all md:break-words">Book Details</h1>
          <p className="animation-typing text-lg md:text-3xl break-all">Details of the selected book will be displayed here.</p>
        </header>
        {/* Book details will go here */}
      </main>
    </div>
  );
}