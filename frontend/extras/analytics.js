import ReactGA from 'react-ga';

export function init() {
    ReactGA.initialize(process.env.GA_ID);
};

export function sendEvent(payload) {
    ReactGA.event(payload);
};

export function sendPageView(path) {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};

export function addInterest(page_url) {
    ReactGA.plugin.require('ec');
    ReactGA.plugin.execute('ec', 'setAction', 'interest', { url: page_url });
    ReactGA.plugin.execute('ec', 'clear');
};

export function addInquiry(page_url) {
    ReactGA.plugin.require('ec');
    ReactGA.plugin.execute('ec', 'setAction', 'inquiry', { url: page_url });
    ReactGA.plugin.execute('ec', 'clear');
};

export function addPurchase(transaction_details) {
    ReactGA.plugin.require('ec');
    ReactGA.plugin.execute('ec', 'setAction', 'purchase', transaction_details);
    ReactGA.plugin.execute('ec', 'clear');
};