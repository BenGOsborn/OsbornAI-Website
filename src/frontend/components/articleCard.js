import React from "react";
import Link from "next/link";
import Image from "next/image";

const ArticleCard = ({
    path,
    title,
    description,
    img,
    img_alt,
    author,
    date_published,
}) => {
    return (
        <div className="ArticleCard">
            <div className="card white">
                <div className="card-image">
                    <Link href={path}>
                        <a>
                            <Image
                                alt={img_alt}
                                src={img}
                                width={1260}
                                height={750}
                                style={{ objectFit: "cover", maxHeight: 300 }}
                            />
                        </a>
                    </Link>
                </div>
                <div className="card-content black-text center">
                    <span
                        className="card-title"
                        style={{ fontWeight: 500, fontSize: 20 }}
                    >
                        <Link href={path}>
                            <a className="truncate">
                                {String(title).toUpperCase()}
                            </a>
                        </Link>
                    </span>
                    <p>
                        {description} {author} - {date_published}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
