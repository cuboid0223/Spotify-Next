import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="text-white px-8 space-y-1 pb-28">
      {playlist?.tracks.items.map((track, id) => (
        <Song key={track.track.id} order={id} track={track} />
      ))}
    </div>
  );
}

export default Songs;
