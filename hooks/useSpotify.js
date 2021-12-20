import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  //   redirectUri: process.env.
});
function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    if (session.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session.user.accessToken);
    console.log("session: ", session);
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
