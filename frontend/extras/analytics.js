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

export function addItem(id, name, price) {
    ReactGA.plugin.require('ecommerce');
    ReactGA.plugin.execute('ecommerce', 'addItem', { id: id, name: name, price: price });
    ReactGA.plugin.execute('ecommerce', 'send');
    ReactGA.plugin.execute('ecommerce', 'clear');
};

export function addPurchase(id) {
    ReactGA.plugin.require('ecommerce');
    ReactGA.plugin.execute('ecommerce', 'addTransaction', { id: id });
    ReactGA.plugin.execute('ecommerce', 'send');
    ReactGA.plugin.execute('ecommerce', 'clear');
};