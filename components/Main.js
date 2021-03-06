import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-green-500",
  "from-pink-500",
  "from-purple-500",
];
function Main() {
  const { data: session } = useSession();
  console.log(session);
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    // 取得 playlist 所有音樂
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlistId]);
  console.log("playlist: ", playlist);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
          <img
            className="block rounded-full w-10 h-10"
            src={session?.user.image}
            alt="fb-avatar"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0].url}
          alt=""
        />
        <p className="text-2xl md:text-3xl xl:text-5xl font-bold">
          {playlist?.name}
        </p>
      </section>

      <Songs />
    </div>
  );
}

export default Main;
