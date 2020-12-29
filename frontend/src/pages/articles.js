import ArticleCard from '../components/article';

// This page will store the article components that link to a component containing the visuals for the item



const TestArticle = () => {
    return (
        <div className="test">
            <h1>Hello world I am the test page!</h1>
        </div>
    );
};



const Articles = () => {
    return (
        <div className="Articles">
            <div class="container">

                {/* I need help with 'dynamic links': https://youtu.be/Law7wfdg_ls?t=1315 */}
                <ArticleCard component={TestArticle()} path="test" title="test" author="test" description="test" keywords="test" />

            </div>
        </div>
    );
};

export default Articles;