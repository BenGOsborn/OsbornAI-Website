import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';

import Articles from './pages/articles-page';
import Article from './pages/article';

import NotFound from './pages/not-found';
import Footer from './components/footer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/articles/:id" exact component={Article} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);