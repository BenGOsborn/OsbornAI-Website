import ReactGA from 'react-ga';

const init = () => {
    ReactGA.initialize('G-KPL5T3PYW1');
};

const sendEvent = (payload) => {
    ReactGA.event(payload);
};

const sendPageview = (path) => {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};

export default { init, sendEvent, sendPageview };