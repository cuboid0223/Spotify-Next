import Head from "next/head";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Cube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black h-screen overflow-hidden flex">
        <Sidebar />
        {/* main */}
        <Main />
      </main>
      <div>{/* player */}</div>
    </div>
  );
}
