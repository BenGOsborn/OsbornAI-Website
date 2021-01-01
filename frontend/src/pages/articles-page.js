import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ArticleCard from '../components/article-card';
import articleMetadata from './articles/article-metadata';

const Articles = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true); // Do something with this loading tag

    const pageSize = 20;

    const grabArticles = (page) => {
        const articles = Object.keys(articleMetadata).slice((page - 1) * pageSize, page * pageSize);

        return articles;
    };

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

export default Articles;