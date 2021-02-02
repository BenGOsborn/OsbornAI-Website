import React from 'react';
import Link from 'next/link';

const ArticleCard = ({ path, title, author, date_published }) => {
    return (
        <div className="ArticleCard">
            <div className="card white">
                <div className="card-content black-text center">
                    <span style={{fontWeight: 500, fontSize: 20}} class="card-title">
                        <Link href={path}>
                            <a className="truncate">{String(title).toUpperCase()}</a>
                        </Link>
                    </span>
                    <p style={{fontWeight: 400, fontSize: 17.5}}>{author} - {date_published}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;