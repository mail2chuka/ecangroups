import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          {' '}
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading</div>;
  }
  return children;
}

/*{import App from "next/app";
import React from "react";
import "../styles/globals.css"; // if you have Tailwind etc.

function MyApp({ Component, pageProps, initialUser }) {
  return (
    <>
      // initialUser is fetched server-side to avoid flicker if needed 
      <Component {...pageProps} initialUser={initialUser} />
    </>
  );
}

MyApp.getInitialProps = async (appCtx) => {
  const appProps = await App.getInitialProps(appCtx);
  let initialUser = null;

  const ctx = appCtx.ctx;
  if (ctx.req) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://${ctx.req.headers.host}`;
    try {
      const res = await fetch(baseUrl + "/api/auth/me", { headers: { cookie: ctx.req.headers.cookie || "" } });
      const json = await res.json();
      initialUser = json.user || null;
    } catch (err) {
      initialUser = null;
    }
  }

  return { ...appProps, initialUser };
};

export default MyApp;
*/
