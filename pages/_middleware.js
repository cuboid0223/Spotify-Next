import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // token 存在 代表 使用者登入
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  // allow the requests if the following is true
  // 1) the token is exist
  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    // 讓 該 req 通過
    return NextResponse.next();
  }

  // redirect them to login if they dont have token and are requesting a protected route
  if (!token && pathname !== "/login") {
    // 沒有 token reject 該 req 並轉址回 login 頁面
    return NextResponse.redirect("/login");
  }
}
