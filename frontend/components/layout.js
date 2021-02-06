import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './header';
import Book from './book';
import Footer from './footer';

export default function Layout(props) {
    const router = useRouter();

    function bareMode() {
        const exclusion_array = [
            '/admin',
            '/pay'
        ];

        for (let i = 0; i < exclusion_array.length; i++) {
            const sub_url = exclusion_array[i];
            if (router.pathname.slice(0, sub_url.length) === sub_url) {
                return true;
            }
        }

        return false;
    };
    const bare = bareMode();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="author" content="OsbornAI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#1E88E5" />
                <meta name="description" content="We use data and AI to help you grow your business. If you have a project in mind that involves lots of data or are looking to grow your business, then book a consult with us, and let's get started!" />
				<meta name="keywords" content="data analytics, business analytics, data dashboards, marketing analysis, business consulting, osbornai, machine learning, data science, artificial intelligence, ai, data" />
                <title>Grow Your Business Using Data and AI - OsbornAI</title>

                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div id="Top" />
            <Header bare={bare} />
            {props.children}
            {bare !== true ? <Book /> : <></>}
            <Footer />
        </>
    );
};