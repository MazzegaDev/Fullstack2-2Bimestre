import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request) {
    //se nao achar a token na cookie redireciona para a interface de login 
    if(!request.cookies.get("token")){
        return NextResponse.redirect()
    }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
    //Proteja a rota de admin e todos seus endpoints 
    matcher: ["/admin/:path*"],
};
