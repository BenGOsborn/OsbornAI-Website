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

// Ecommerce implementation:
// https://github.com/react-ga/react-ga/issues/269
// https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce