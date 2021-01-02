import { Link } from 'react-router-dom';

const ArticleCard = (props) => {
    const path = `/articles/${props.path}`

    return (
        <div className="ArticleCard">
            <div class="card white">
                <div class="card-content black-text center">
                    <span style={{fontWeight: 500}} class="card-title"><Link to={path}>{String(props.title).toUpperCase()}</Link></span>
                    <p style={{fontWeight: 400, fontSize: 17.5}}>{props.author} - {props.date_published}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;