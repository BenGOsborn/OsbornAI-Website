import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';
import ScrollToTop from './scroll-to-top';

import Articles from './pages/articles-page';
import Article from './pages/article';

import AdminHeader from './components/admin-header';
import Admin from './pages/admin';

import NotFound from './pages/not-found';

import Book from './components/book';
import Footer from './components/footer';

const exclusion_array = [
    '/admin',
    '/admin/'
];

const App = ({ location }) => {
    return (
        <>
            <ScrollToTop />
            {exclusion_array.indexOf(location.pathname) < 0 && <Header />}
            {exclusion_array.indexOf(location.pathname) >= 0 && <AdminHeader />}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/articles" exact component={Articles} />
                <Route path="/articles/:id" exact component={Article} />
                <Route path="/admin" exact component={Admin} />
                <Route path="*" component={NotFound} />
            </Switch>
            {exclusion_array.indexOf(location.pathname) < 0 && <Book />}
            <Footer />
        </>
    );
};

export default withRouter(App);