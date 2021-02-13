import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { sendEvent } from '../extras/analytics';

export default function NotFound(props) {
    const router = useRouter();
    const inquire_path = `${router.pathname}#Inquire`.replace(/\[.*?\]/, router.query.slug);

    return (
        <div className="NotFound">
            <Head>
                <title>Page Not Found - OsbornAI</title>
                <meta name="description" content="The page you're looking for cannot be found!" />
                <meta name="keywords" content="invalid url, invalid page, osbornai, bad page, invalid, error, 404, error page, bad url" />
                <meta name="robots" content="noindex, nofollow" />

                <meta property="og:title" content="Page Not Found - OsbornAI" />
                <meta property="og:description" content="The page you're looking for cannot be found!" />

                <meta name="twitter:title" content="Page Not Found - OsbornAI" />
                <meta name="twitter:description" content="The page you're looking for cannot be found!" />
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
                            <Link href="/#About">ABOUT</Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/#Services">SERVICES</Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href={inquire_path}>
                                <a onClick={() => { 
                                    sendEvent({ category: 'Interest', action: 'Showed interest in inquiring', label: '/404' });
                                }
                                }>
                                    INQUIRE
                                </a>
                            </Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/articles">ARTICLES</Link>
                        </div>
                    </b>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
};