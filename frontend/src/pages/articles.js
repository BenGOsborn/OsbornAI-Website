// This is going to be a single JSON based component that will contain the metadata for each article

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArticleCard } from './articles-page';

import TestArticle from './articles/test-article';

const articleMetadata = {
    'test-twentyeight': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-twentyseven': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-twentysix': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-twentyfive': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-twentyfour': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-twentythree': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-twentytwo': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-twentyone': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-twenty': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-nineteen': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-eighteen': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-seventeen': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-sixteen': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-fifteen': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-fourteen': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-thirteen': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-twelve': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-eleven': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-ten': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-nine': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-eight': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-seven': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-six': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-five': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-four': {'component': TestArticle(), 'title': 'Article 4', 'author': 'OsbornAI', 'description': 'Art4', 'keywords': 'ArtKeyword4', 'date_published': 'Dec 31'},
    'test-three': {'component': TestArticle(), 'title': 'Article 3', 'author': 'OsbornAI', 'description': 'Art3', 'keywords': 'ArtKeyword3', 'date_published': 'Dec 31'},
    'test-two': {'component': TestArticle(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
    'test-one': {'component': TestArticle(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
};

// This is going to render our raw HTML components
const Article = (props) => {
    // This will come from the URL that we are sent by
    const articleId = props.match.params.id;
    const article = articleMetadata[articleId];

    const recents = Object.keys(articleMetadata).slice(0, 3).map((articlePath) => {
        const currentArticle = articleMetadata[articlePath];
        return (
            // My articles are not returning themselves properly
            <div class="col s12 m4 l4">
                <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
            </div>
        );
    });

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
                    {article.component}
                    <br />
                    <br />
                    <div class="center">
                        <p class="flow-text">
                            Enjoyed this article? Checkout our most recent posts!
                        </p>
                        <div class="row">
                            {recents}
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

export { articleMetadata, Article };