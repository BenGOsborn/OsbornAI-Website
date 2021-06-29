import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
import Header from "./header";
import Inquire from "./inquire";
import Footer from "./footer";

export default function Layout(props) {
    const [siteUrl, setSiteUrl] = React.useState("");
    const [bare, setBare] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        const tagManagerArgs = { gtmId: "GTM-PKSW92X" };
        TagManager.initialize(tagManagerArgs);

        setBare(false);

        const site_url =
            "https://osbornai.com" +
            `${router.pathname}`.replace(/\[.*?\]/, router.query.slug);
        setSiteUrl(site_url);

        const exclusion_array = ["/admin", "/pay", "/legal"];
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
                <meta charSet="utf-8" key="charSet" />
                <link rel="icon" href="/favicon.ico" key="icon" />
                <meta name="author" content="OsbornAI" key="author" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                    key="viewport"
                />
                <meta name="theme-color" content="#1E88E5" key="themeColor" />
                <meta
                    name="description"
                    content="We use data and AI to help you grow your business. If you are interested in what data can do your business, or have a project in mind that involves data, then inquire about a consult with us and let's get started!"
                    key="description"
                />
                <meta
                    name="keywords"
                    content="analytics, osbornai, data analysis, insights, business, reports, visualizations, target audience, data collection, metric tracking, big data, data tracking, metrics, data storage, scalable, pipelines, raw data, transform, decisions, data"
                    key="keywords"
                />
                <meta name="robots" content="index, follow" key="robots" />
                <title key="title">
                    Grow Your Business Using Data and AI - OsbornAI
                </title>

                <link rel="canonical" href={siteUrl} key="canonical" />

                <meta property="og:locale" content="en_US" key="ogLocale" />
                <meta property="og:type" content="company" key="ogType" />
                <meta
                    property="og:title"
                    content="Grow Your Business Using Data and AI - OsbornAI"
                    key="ogTitle"
                />
                <meta
                    property="og:description"
                    content="We use data and AI to help you grow your business. If you are interested in what data can do your business, or have a project in mind that involves data, then inquire about a consult with us and let's get started!"
                    key="ogDescription"
                />
                <meta property="og:url" content={siteUrl} key="ogUrl" />
                <meta
                    property="og:site_name"
                    content="OsbornAI"
                    key="ogSiteName"
                />
                <meta
                    property="og:image"
                    content="https://i.imgur.com/8FL8W7A.png"
                    key="ogImage"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                    key="twitterCard"
                />
                <meta
                    name="twitter:site"
                    content="@BenOsbornAI"
                    key="twitterSite"
                />
                <meta
                    name="twitter:creator"
                    content="@BenOsbornAI"
                    key="twitterCreator"
                />
                <meta
                    name="twitter:title"
                    content="Grow Your Business Using Data and AI - OsbornAI"
                    key="twitterTitle"
                />
                <meta
                    name="twitter:description"
                    content="We use data and AI to help you grow your business. If you are interested in what data can do your business, or have a project in mind that involves data, then inquire about a consult with us and let's get started!"
                    key="twitterDescription"
                />
                <meta
                    name="twitter:image"
                    content="https://i.imgur.com/8FL8W7A.png"
                    key="twitterImage"
                />
                <meta
                    name="twitter:image:alt"
                    content="The banner of the OsbornAI website"
                    key="twitterImageAlt"
                />

                <link
                    rel="apple-touch-icon"
                    href="/logoWhite192.png"
                    key="appleTouchIcon"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/logoWhite192.png"
                    key="appleTouchStartupIcon"
                />

                <link rel="manifest" href="/manifest.json" key="manifest" />

                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
                    key="materializeJS"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
                    key="materializeCSS"
                />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                    key="materializeIcons"
                />
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
}
