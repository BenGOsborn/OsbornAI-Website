import React from 'react';
import { useEffect } from 'react';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/article-card';
import articleMetadata from './articles/article-metadata'

const Article = (props) => {
    const articleId = props.match.params.id;
    const article = articleMetadata[articleId];

    const validArticles = Object.keys(articleMetadata).filter(articlePath => articlePath !== articleId).slice(0, 3);

    useEffect(() => {
        analytics.init();
        
        const id = props.match.params.id;
        const validArticle = articleMetadata[id];

        if (validArticle) {
            analytics.sendPageview(`/articles/${id}`);
        } else {
            analytics.sendPageview('/invalid-article');
        }
    }, []);

    const recents = () => {
        if (validArticles.length === 0) {
            return (
                <>
                    <div class="container">
                        <p class="flow-text" style={{fontSize: 20}}>
                            There are no other articles available at this time. 
                            Check back regularly to find the latest topics, news and tutorials regarding all things data science!
                        </p>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    {
                        validArticles.map((articlePath) => {
                            const currentArticle = articleMetadata[articlePath];
                            if (validArticles.length === 1) {
                                return (
                                    <div class="col s12 m12 l12">
                                        <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
                                    </div>
                                );
                            } else if (validArticles.length === 2) {
                                return (
                                    <div class="col s12 m12 l6">
                                        <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div class="col s12 m12 l4">
                                        <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
                                    </div>
                                );
                            }
                        })
                    }
                </>
            );
        }
    };


    if (!article) {
        return (
            <div className="Article">
                <div class="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>404 Error:</h1>
                    <h3>The article you're looking for cannot be found!</h3>
                    <div class="container">
                        <p class="flow-text">
                            You can find a list of our existing articles <Link href="/" to="/articles">here</Link>. 
                            Check back regularly to find the latest topics, news, and tutorials regarding all things data science!
                        </p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        );
    } else {
        return (
            <div className="Article">
                <div class="container">
                    <div class="center">
                        <h1>{article.title}</h1>
                        <p class="col s6 m6 l6 flow-text">{article.author} - {article.date_published} </p>
                    </div>
                    <br />
                    <br />
                    {article.component}
                    <br />
                    <br />
                    <div class="center">
                        <p class="flow-text" style={{fontSize: 23}}>
                            Enjoyed this article? Checkout our most recent posts!
                        </p>
                        <div class="row">
                            {recents()}
                        </div>
                    </div>
                </div>
                <Helmet>
                    <title>{`${article.title} - OsbornAI`}</title>
                    <meta name="author" content={article.author} />
                    <meta name="description" content={article.description} />
                    <meta name="keywords" content={article.keywords} />
                </Helmet>
            </div>
        );
    }

};

export default Article;