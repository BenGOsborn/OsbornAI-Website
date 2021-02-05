import ReactGA from 'react-ga';

export function init() {
    ReactGA.initialize('UA-186264216-1');
};

export function sendEvent(payload) {
    ReactGA.event(payload);
};

export function sendPageView(path) {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};