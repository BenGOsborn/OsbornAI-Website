import { Helmet } from 'react-helmet';
import { BrowserRouter as Route, useRouteMatch, Link, Switch } from 'react-router-dom'; // Clean the ones that are not used up

// This needs a way of rendering a prop it is parsed, as well as displaying the correct meta tags

const Article = (props) => {
    return (
        <div className="Article">
            <div class="container">
                {props.component}
            </div>
            <Helmet>
                <title>{props.title}</title>
                <meta name="author" content={props.author} />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
            </Helmet>
        </div>
    );
};

const ArticleCard = (props) => {
    const { url } = useRouteMatch();
    const path = `${url}/${props.path}`

    return (
        <div className="ArticleCard">
            <Switch>
                <Route path={path} exact>
                    <Article component={props.component} title={props.title} author={props.author} description={props.description} keywords={props.keywords} />
                </Route>
            </Switch>
            <Link to={path}>{props.title}</Link>
        </div>
    );
};


export default ArticleCard;