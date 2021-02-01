import React from 'react';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';

const PayBlank = () => {
    React.useEffect(() => {
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
                    <h3>Invalid payment URL!</h3>
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
                <title>Invalid Payment URL - OsbornAI</title>
                <meta name="description" content="This payment URL is invalid! Check the URL and try again!" />
                <meta name="keywords" content="payment, pay, osbornai, checkout, invalid" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </div>
    );
};

export default PayBlank;