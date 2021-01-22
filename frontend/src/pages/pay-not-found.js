import { useEffect } from 'react';
import analytics from '../analytics';

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
        </div>
    );
};

export default PayBlank;