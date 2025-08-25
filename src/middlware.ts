export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/summary","/coins-spend","/transactions"] };