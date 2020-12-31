// This is the page that will be displayed on the article route and will display our routes
// We will have to have a filter system where it only displays the amount of most recents at a time

// This is going to pull information from the custom URL containing the links that we have

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

const Articles = () => {

    // This is the big block of mapped article cards that we have to go and change for ths

    // Use the content component instead of the 'react-infinite-scroll-component'
    const articles = Object.keys(articleMetadata).map((articlePath) => {
        const currentArticle = articleMetadata[articlePath];
        return (
            <div class="col s12 m6 l6">
                <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
            </div>
        );
    });

    return (
        <div className="ArticlesPage">
            <div class="container">
                <br />
                <br />
                <div class="container center">
                    <p style={{fontSize: 30}} class="flow-text">
                        Here's a list of our existing articles. Check back regularly to find
                        the latest topics, news, and tutorials regarding all things data science!
                    </p>
                    <br />
                    {/* I need to add an infinite scrolling feature */}
                    {/* Group the return by the amount to return which will be about 30 each call */}
                    <div class="row" onScroll>
                        {articles}
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