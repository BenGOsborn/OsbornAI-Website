import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './components/header';
import ScrollToTop from './scroll-to-top';

import Home from './pages/home';
import Pay from './pages/pay';
import PayNotFound from './pages/pay-not-found';

import Articles from './pages/articles-page';
import Article from './pages/article';

import BlankHeader from './components/blank-header';
import Admin from './pages/admin';

import NotFound from './pages/not-found';

import Book from './components/book';
import Footer from './components/footer';

const App = ({ location }) => {
    const header = () => {
        const url = location.pathname;

        const exclusion_array = [
            '/admin',
            '/pay'
        ];

        for (let i=0; i < exclusion_array.length; i++) {
            let sub_url = exclusion_array[i];
            if (url.includes(sub_url)) {
                return false;
            }
        }

        return true;
    };

    return (
        <>
            <ScrollToTop />
            {header() && <Header />}
            {!header() && <BlankHeader />}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pay" exact component={PayNotFound} />
                <Route path="/pay/:payment_id" exact component={Pay} />
                <Route path="/articles" exact component={Articles} />
                <Route path="/articles/:id" exact component={Article} />
                <Route path="/admin" exact component={Admin} />
                <Route path="*" component={NotFound} />
            </Switch>
            {header() && <Book />}
            <Footer />
        </>
    );
};

export default withRouter(App);