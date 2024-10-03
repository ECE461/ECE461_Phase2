// src/app/about/more_information.tsx
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page of our Next.js application.</p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
}