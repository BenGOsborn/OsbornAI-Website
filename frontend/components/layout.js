import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './header';
import Inquire from './inquire';
import Footer from './footer';
import { init, sendPageView } from '../extras/analytics';

export default function Layout(props) {
    const [siteUrl, setSiteUrl] = React.useState('');
    const [bare, setBare] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        init();
        
        setBare(false);

        const path = `${router.pathname}`.replace(/\[.*?\]/, router.query.slug);
        sendPageView(path);

        const site_url = window.location.protocol + '//' + window.location.hostname + path;
        setSiteUrl(site_url);

        const exclusion_array = ['/admin', '/pay', '/legal'];
        for (let i = 0; i < exclusion_array.length; i++) {
            const sub_url = exclusion_array[i];
            if (router.pathname.slice(0, sub_url.length) === sub_url) {
                setBare(true);
                return;
            }
        }
    });

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
                <meta name="robots" content="index, follow" />
                <title>Grow Your Business Using Data and AI - OsbornAI</title>

                <link rel="canonical" href={siteUrl} />

                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="company" />
                <meta property="og:title" content="Grow Your Business Using Data and AI - OsbornAI" />
                <meta property="og:description" content="We use data and AI to help you grow your business. If you have a project in mind that involves lots of data or are looking to grow your business, then book a consult with us, and let's get started!" />
                <meta property="og:url" content={siteUrl} /> 
                <meta property="og:site_name" content="OsbornAI" />
                <meta property="og:image" content="https://i.imgur.com/8FL8W7A.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@BenOsbornAI" />
                <meta name="twitter:creator" content="@BenOsbornAI" />
                <meta name="twitter:title" content="Grow Your Business Using Data and AI - OsbornAI" />
                <meta name="twitter:description" content="We use data and AI to help you grow your business. If you have a project in mind that involves lots of data or are looking to grow your business, then book a consult with us, and let's get started!" />
                <meta name="twitter:image" content="https://i.imgur.com/8FL8W7A.png" />
                <meta name="twitter:image:alt" content="The banner of the OsbornAI website" />

                <link rel="apple-touch-icon" href="/logoWhite192.png" />
                <link rel="apple-touch-startup-image" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div id="Top" />
            <Header bare={bare} />
            <main>
                {props.children}
                {bare !== true ? <Inquire /> : <></>}
            </main>
            <Footer />
        </>
    );
};