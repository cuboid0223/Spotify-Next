import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession;
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  // 音量
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();
  console.log(songInfo);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      console.log("dd", data);
      if (data.body && data.body.is_playing) {
        console.log("User is currently playing something!");
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        console.log("User is not playing anything, or doing so in private.");
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);
  return (
    <div className="flex justify-between grid-col-3 text-xs md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-900 text-white">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images[0]?.url}
          alt=""
        />

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly space-x-6">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" onClick={() => spotifyApi.skipToNext()} />
      </div>
      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon className="button" />
        <input type="range" main={0} max={100} />
        <VolumeUpIcon className="button" />
      </div>
    </div>
  );
}

export default Player;
