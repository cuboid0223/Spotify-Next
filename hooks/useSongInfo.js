import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (!currentTrackId) return;

      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` },
        //   data: { device_ids: ["74ASZWbe4lXaubB36ztrGX"] },
        }
      ).then((res) => res.json());
    //   console.log("trackInfo: ", trackInfo);
      setSongInfo(trackInfo);
    };
    fetchSongInfo();
  }, [spotifyApi, currentTrackId]);

  return songInfo;
}

export default useSongInfo;
