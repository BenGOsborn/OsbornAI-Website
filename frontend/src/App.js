import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import ScrollToTop from './scroll-to-top';

import Home from './pages/home';
import Pay from './pages/pay';
import PayNotFound from './pages/payNotFound';

import Articles from './pages/articlesPage';
import Article from './pages/article';

import BlankHeader from './components/blankHeader';
import Admin from './pages/admin';

import NotFound from './pages/notFound';

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
        <div className="App">
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
        </div>
    );
};

export default App;