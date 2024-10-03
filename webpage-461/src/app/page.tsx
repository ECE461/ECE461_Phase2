// pages/index.tsx
"use client"

import { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/parse_url', { url });
      setMessage(response.data.message);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Input
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            label="URL"
            placeholder="Enter a GitHub or npm URL"
            radius="lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={handleSubmit}
          >
            Enter
          </Button>
        </div>
        <p>{message}</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
      </footer>
    </div>
  );
}