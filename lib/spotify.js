import SpotifyWebApi from "spotify-web-api-node";

// Spotify 回傳使用者資訊的可用範圍
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};
// 為了讓程式碼可讀性與擴充性提升 所以把資料分開處理
// https://pjchender.blogspot.com/2018/08/js-javascript-url-parameters.html
const queryParamString = new URLSearchParams(params).toString();
// queryParamString = "scope=[user-read-email,playlist-read-private ... ,user-follow-read]"

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  //   redirectUri: process.env.
});

export default spotifyApi;
export { LOGIN_URL };
