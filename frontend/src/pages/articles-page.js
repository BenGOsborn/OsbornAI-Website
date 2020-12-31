// This is the page that will be displayed on the article route and will display our routes
// We will have to have a filter system where it only displays the amount of most recents at a time

// This is going to pull information from the custom URL containing the links that we have

import { Suspense } from 'react';
import { Link } from 'react-router-dom'; // Clean the ones that are not used up
import { articleMetadata } from './articles';


// Maybe I wont even need this article card
const ArticleCard = (props) => {
    const path = `/articles/${props.path}`

    return (
        // This should be in the form of a card
        <div className="ArticleCard">
            <div class="card white">
                <div class="card-content black-text center">
                    <span class="card-title"><Link to={path}><b>{String(props.title).toUpperCase()}</b></Link></span>
                    <p>{props.author} - {props.date_published}</p>
                </div>
            </div>
        </div>
    );
};

const Articles = () => {
    // I want an option on this page which can determine what page of articles to list and will split the articles depending on the page, and I want to be
    // able to determine that if there are no items within the object we try and map then we will return an error to the user

    const articles = Object.keys(articleMetadata).map((articlePath) => {
        const currentArticle = articleMetadata[articlePath];
        return (
            <div class="col s6 m6 l6">
                <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
            </div>
        );
    });

    const loadingComponent = () => {
        return (
            <>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p class="flow-text">Loading...</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </>
        );
    };

    return (
        <div className="ArticlesPage">
            <div class="container">
                <br />
                <br />
                <div class="container center">
                    <p class="flow-text">
                        Here's a list of our existing articles. Check back regularly to find
                        the latest topics, news, and tutorials regarding all things data science!
                    </p>
                    <br />
                    <Suspense fallback={loadingComponent()}>
                        <div class="row">
                            {articles}
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );

};

export { Articles, ArticleCard };