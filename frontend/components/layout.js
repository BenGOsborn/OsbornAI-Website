import React from 'react';
import Header from './header';
import Head from 'next/head';

export default function Layout({ children }) {
    React.useEffect(() => {
        window.addEventListener("DOMContentLoaded", event => {
        const optionsSidenav = {
          edge: 'left',
          draggable: true,
          inDuration: 250,
          outDuration: 200,
          onOpenStart: null,
          onOpenEnd: null,
          onCloseStart: null,
          onCloseEnd: null,
          preventScrolling: true
        }

        const sidenavContainer = document.querySelector(".sidenav");
        M.Sidenav.init(sidenavContainer, optionsSidenav);
      });
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <Header />
            {children}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    );
};