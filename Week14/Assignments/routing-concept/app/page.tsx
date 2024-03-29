
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center max-w-screen-2xl">
        <div className="flex flex-col mt-36">
          <div className="text-2xl flex justify-start font-bold">
          Welcome to Home Page
          </div>
          <div className="mt-8">
              📘 Client Page: Interactive client-side rendering in action
          </div>
          <div>
            🚀 Server Page: Optimized static content for SEO
          </div>
        </div>
        
    </div>
  );
}
