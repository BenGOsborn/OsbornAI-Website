import ReactGA from 'react-ga';

const init = () => {
    ReactGA.initialize('UA-186264216-1');
};

const sendEvent = (payload) => {
    ReactGA.event(payload);
};

const sendPageview = (path) => {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
};

const exprt = { init, sendEvent, sendPageview }

export default exprt;