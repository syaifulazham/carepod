import Image from "next/image";
import Link from "next/link";
import Logo from "./lib/images/carepod.png"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col justify-center  gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src={Logo}
          alt="CarePod logo"
          width={180}
          height={38}
          priority
        />
       
       <Link href="/questionnaire" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-center">
          Mulai
        </div>
       </Link>
      </main>
      
    </div>
  );
}
