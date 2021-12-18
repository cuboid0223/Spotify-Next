import { getProviders, signIn } from "next-auth/react";
function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider, id) => (
        <div key={id}>
          <button
            className="bg-[#18d860] text-white p-5 rounded-lg"
            // 登入後轉址到首頁 callbackUrl: "/"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  // run on the server before the page gets delivered every timers
  // 在 server 傳送頁面之前，就執行 ，即為 getServerSideProps
  const providers = await getProviders();

  // 一定要 return
  return {
    props: {
      providers,
    },
  };
}
