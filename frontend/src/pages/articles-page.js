// This is the page that will be displayed on the article route and will display our routes
// We will have to have a filter system where it only displays the amount of most recents at a time

// This is going to pull information from the custom URL containing the links that we have

import { Link, useRouteMatch } from 'react-router-dom'; // Clean the ones that are not used up
import { articleMetadata } from './articles';


// Maybe I wont even need this article card
const ArticleCard = (props) => {
    const { url } = useRouteMatch();
    const path = `${url}/${props.path}`

    return (
        // This should be in the form of a card
        <div className="ArticleCard">
            <div class="col s6 m4 l4">
                <div class="card white">
                    <div class="card-content black-text center">
                        <span class="card-title"><Link to={path}><b>{String(props.title).toUpperCase()}</b></Link></span>
                        <p>{props.author} - {props.date_published}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Articles = () => {
    // So this is going to take for us a list of items and have a page number button down the bottom as well to sort between them
    // I'm going to have to pull through each article, and take the most recent ones using a division argument and then 

    const articles = Object.keys(articleMetadata).map((articlePath) => {
        const currentArticle = articleMetadata[articlePath];
        return (
            <ArticleCard path={articlePath} title={currentArticle.title} date_published={currentArticle.date_published} author={currentArticle.author} />
        );
    });

    return (
        <div className="ArticlesPage">
            <div class="container">
                <br />
                <br />
                <br />
                <br />
                <div class="row">
                    {articles}
                </div>
            </div>
        </div>
    );

};

export default Articles;