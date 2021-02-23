import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function NotFound(props) {
    const router = useRouter();
    const inquire_path = `${router.pathname}#Inquire`.replace(/\[.*?\]/, router.query.slug);

    return (
        <div className="NotFound">
            <Head>
                <title key="title">Page Not Found - OsbornAI</title>
                <meta name="description" content="The page you're looking for cannot be found!" key="description" />
                <meta name="keywords" content="invalid url, invalid page, osbornai, bad page, invalid, error, 404, error page, bad url" key="keywords" />
                <meta name="robots" content="noindex, nofollow" key="robots" />

                <meta property="og:title" content="Page Not Found - OsbornAI" key="ogTitle" />
                <meta property="og:description" content="The page you're looking for cannot be found!" key="ogDescription" />

                <meta name="twitter:title" content="Page Not Found - OsbornAI" key="twitterTitle" />
                <meta name="twitter:description" content="The page you're looking for cannot be found!" key="twitterDescription" />
            </Head>
            <div className="container">
                <div className="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>404 Error:</h1>
                    <h3>The page you're looking for cannot be found!</h3>
                    <p className="flow-text">
                        Here are some links to help you find what you're looking for:
                    </p>
                    <br />
                    <br />
                </div>
                <div className="row center" style={{fontSize: 30}}>
                    <b>
                        <div className="col s12 m12 l3">
                            <Link href="/#About"><a>ABOUT</a></Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/#Services"><a>SERVICES</a></Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href={inquire_path}><a>INQUIRE</a></Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/articles"><a>ARTICLES</a></Link>
                        </div>
                    </b>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
};