import React from 'react';
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-scroll';
import { Link as RouteLink } from 'react-router-dom';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';

const NotFound = () => {
    useEffect(() => {
        analytics.init();
        analytics.sendPageview('/invalid-page'); // I want to determine the actual URL
    }, []);

    return (
        <div className="NotFound">
            <div class="container">
                <div class="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>404 Error:</h1>
                    <h3>The page you're looking for cannot be found!</h3>
                    <p class="flow-text">
                        Here are some links to help you find what you're looking for:
                    </p>
                    <br />
                    <br />
                </div>
                <div class="row center" style={{fontSize: 20}}>
                    <b>
                        <div class="col s12 m12 l3">
                            <HashLink to="/#About" smooth={true}>ABOUT</HashLink>
                        </div>
                        <div class="col s12 m12 l3">
                            <HashLink to="/#Services" smooth={true}>SERVICES</HashLink>
                        </div>
                        <div class="col s12 m12 l3">
                            <RouteLink to="/articles" smooth={true}>ARTICLES</RouteLink>
                        </div>
                        <div class="col s12 m12 l3">
                            <Link href="/" to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link>
                        </div>
                    </b>
                </div>
                <br />
                <br />
                <br />
            </div>
            <Helmet>
                <title>Page Not Found - OsbornAI</title>
                <meta name="description" content="The page you're looking for cannot be found!" />
                <meta name="keywords" content="invalid url, invalid page, osbornai, bad page, invalid" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </div>
    );
};

export default NotFound;