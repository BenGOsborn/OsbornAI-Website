import { useEffect } from 'react';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';

const PayBlank = () => {
    useEffect(() => {
        analytics.init();
        analytics.sendPageview('/pay-not-found');
    }, []);

    return (
        <div className="PayNotFound">
            <div class="container">
                <div class="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>404 Error:</h1>
                    <h3>Invalid payment ID!</h3>
                    <h4>Please check the URL and try again!</h4>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
            <Helmet>
                <title>Invalid Payment ID - OsbornAI</title>
                <meta name="description" content="This page is displayed when there is a bad payment ID!" />
                <meta name="keywords" content="payment, pay, osbornai, checkout, money" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </div>
    );
};

export default PayBlank;