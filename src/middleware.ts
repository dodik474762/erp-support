import withAuth from "@/middlewares/withAuth";
import { NextRequest, NextResponse } from "next/server";
import routerMiddleware from "./config/routes-middleware";


export function mainMiddleware(req: NextRequest){
    const res = NextResponse.next();
    console.log(req.nextUrl.pathname);
    return res;
}

export default withAuth(mainMiddleware, routerMiddleware());