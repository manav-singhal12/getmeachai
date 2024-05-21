import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto text-white">
      <div className="first flex flex-col justify-center items-center h-[34vh] gap-4">
        <h1 className="text-4xl font-bold flex items-center">
          Buy me a chai
          <span className="ml-2"><Image src="/chai.gif" alt="chai" width={44} height={44} /></span>
        </h1>
        <p>Get your chai here at minimal cost</p>
        <div className="buttons flex flex-col md:flex-row gap-2 mt-4">
          <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 md:mb-0">
              Start Now
            </button>
          </Link>
          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="line bg-white h-1 opacity-10 my-6"></div>
      <p className="text-2xl font-bold text-center mb-6">Learn more about us</p>
      <div className="second flex flex-wrap justify-center gap-4 mx-auto px-4 md:px-10 py-12">
        <div className="second1 flex flex-col gap-1 text-center">
          <Image
            src="/worktog.webp"
            alt="work together"
            width={160}
            height={160}
            className="object-cover mx-auto rounded-xl"
          />
          <p className="text-lg font-semibold">Let's Work Together</p>
          <p>This is a place to work together</p>
        </div>
        <div className="second1 flex flex-col gap-1 text-center">
          <Image
            src="/coin.webp"
            alt="work together"
            width={180}
            height={180}
            className="object-cover rounded-xl"
          />
          <p className="text-lg font-semibold">Let's Work Together</p>
          <p>This is a place to work together</p>
        </div>
        <div className="second1 flex flex-col gap-1 text-center">
          <Image
            src="/team.webp"
            alt="work together"
            width={160}
            height={160}
            className="object-cover rounded-xl"
          />
          <p className="text-lg font-semibold">Let's Work Together</p>
          <p>This is a place to work together</p>
        </div>
      </div>
    </div>
  );
}
