import analytics from '../analytics';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ArticleCard from '../components/article-card';
import articleMetadata from './articles/article-metadata';

const Articles = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const pageSize = 20;

    const grabArticles = (page) => {
        const articles = Object.keys(articleMetadata).slice((page - 1) * pageSize, page * pageSize);

        return articles;
    };

    useEffect(() => {
        analytics.init();
        analytics.sendPageview('/articles');
    }, []);

    useEffect(() => {
        const handleScroll = (event) => {
            if ((document.body.scrollHeight - window.scrollY < 1400) && (loading === false)) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        const articles = grabArticles(page);
        if (articles.length !== 0) {
            setArticles(prev => [...prev, ...articles]);
            setLoading(false);
        }
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
                <br />
                <br />
                <div class="container center" >
                    <p style={{fontSize: 27.5, fontWeight: 475}} class="flow-text">
                        Here's a list of our existing articles. Check back regularly to find
                        the latest topics, news, and tutorials regarding all things data science!
                    </p>
                    <br />
                    <br />
                    <br />
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

export default Articles;