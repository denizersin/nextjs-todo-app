import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });
                const user = await res.json();
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login", // sign() artik default sayfaya degil buraya yonlendirilir.
    }
    ,
    callbacks: {
        
        jwt: async ({ token, user }) => {
            return { ...token, ...user };
        },

        session: async ({ session, token }) => {
            session.user = token as any;
            return session;
        },
    },
});


export { handler as GET, handler as POST };

//!handler is a function so next-auth can use it as a route.
//! we should export it as GET and POST so that next-auth can use it as a route for both GET and POST requests.

//user burada giris yaptiginda next-auth otomatik olarak session olusturuyor.
//bizim olusturdugumuz (accses token)jwt ile next-auth session ayni degil!