// This is the page that will be displayed on the article route and will display our routes
// We will have to have a filter system where it only displays the amount of most recents at a time

// This is going to pull information from the custom URL containing the links that we have

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Clean the ones that are not used up
import { Helmet } from 'react-helmet';
import { articleMetadata } from './articles';

// Maybe I wont even need this article card
const ArticleCard = (props) => {
    const path = `/articles/${props.path}`

    return (
        // This should be in the form of a card
        <div className="ArticleCard">
            <div class="card white">
                <div class="card-content black-text center">
                    <span style={{fontWeight: 750}} class="card-title"><Link to={path}>{String(props.title).toUpperCase()}</Link></span>
                    <p style={{fontWeight: 400, fontSize: 17.5}}>{props.author} - {props.date_published}</p>
                </div>
            </div>
        </div>
    );
};

const pageSize = 20;

const grabArticles = (page) => {
    const articles = Object.keys(articleMetadata).slice((page - 1) * pageSize, page * pageSize);

    return articles;
};

const Articles = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true); // Do something with this loading tag

    const handleScroll = (event) => {
        if (document.body.scrollHeight - window.scrollY < 1400) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        setLoading(true);
        const articles = grabArticles(page);
        setArticles(prev => [...prev, ...articles]);
        setLoading(false);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page]);

    const articleDisplay = articles.map((articlePath) => {
        const currentArticle = articleMetadata[articlePath];
        if ((articles.length % 2 !== 0) && (articlePath === articles[articles.length - 1])) {
            return (
                <div class="col s12 m12 l12">
                    <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
                </div>
            );
        } else {
            return (
                <div class="col s12 m12 l6">
                    <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
                </div>
            );
        }
    });

    return (
        <div className="ArticlesPage">
            <div class="container">
                <br />
                <br />
                <div class="container center" >
                    <p style={{fontSize: 27.5, fontWeight: 475}} class="flow-text">
                        Here's a list of our existing articles. Check back regularly to find
                        the latest topics, news, and tutorials regarding all things data science!
                    </p>
                    <br />
                    <div class="row">
                        {articleDisplay}
                    </div>
                </div>
            </div>
            <Helmet>
                <title>Articles - OsbornAI</title>
                <meta name="author" content="OsbornAI" />
                <meta name="description" content="A list of our existing articles containing the latest topics, news, and tutorials regarding all things data science!" />
                <meta name="keywords" content="articles, data science, ai, machine learning, news, blog, tutorials" />
            </Helmet>
        </div>
    );

};

export { Articles, ArticleCard };