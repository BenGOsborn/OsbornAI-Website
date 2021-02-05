import ReactGA from 'react-ga';

export function init() {
    ReactGA.initialize(process.env.GA_KEY);
};

export function sendEvent(payload) {
    ReactGA.event(payload);
};

export function sendPageView(path) {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};