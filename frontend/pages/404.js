import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function NotFound(props) {
    const router = useRouter();
    const book_path = `${router.pathname}#Book`;

    return (
        <div className="NotFound">
            <Head>
                <title>Page Not Found - OsbornAI</title>
                <meta name="description" content="The page you're looking for cannot be found!" />
                <meta name="keywords" content="invalid url, invalid page, osbornai, bad page, invalid" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="container">
                <div className="container center">
                    <br />
                    <br />
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
                <div className="row center" style={{fontSize: 20}}>
                    <b>
                        <div className="col s12 m12 l3">
                            <Link href="/#About">ABOUT</Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/#Services">SERVICES</Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href="/articles">ARTICLES</Link>
                        </div>
                        <div className="col s12 m12 l3">
                            <Link href={book_path}>BOOK A CONSULT</Link>
                        </div>
                    </b>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};