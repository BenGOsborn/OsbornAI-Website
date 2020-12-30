// This is going to be a single JSON based component that will contain the metadata for each article

import { Helmet } from 'react-helmet';

import article1 from './articles/article1';
import article2 from './articles/article2';

const articleMetadata = {
    'test-one': {'component': article1(), 'title': 'Article 1', 'author': 'OsbornAI', 'description': 'Art1', 'keywords': 'ArtKeyword1', 'date_published': 'Dec 30'},
    'test-two': {'component': article2(), 'title': 'Article 2', 'author': 'OsbornAI', 'description': 'Art2', 'keywords': 'ArtKeyword2', 'date_published': 'Dec 30'},
};

// This is going to render our raw HTML components
const Article = (props) => {
    // This will come from the URL that we are sent by
    const articleId = props.match.params.id;
    const article = articleMetadata[articleId];

    if (!article) {
        return (
            <div className="Article">
                <div class="container">
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>This article does not exist!</h1>
                    {/* I need to go and add more to this to have it fill up the page */}
                </div>
            </div>
        );
    } else {
        return (
            <div className="Article">
                <div class="container">
                    {article.component}
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