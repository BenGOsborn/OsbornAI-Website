import React from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import style from "../../styles/Markdown.module.css";
import ArticleCard from "../../components/articleCard";
import Prism from "prismjs";

import { parseBadDate } from "../../extras/helpers";

import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-docker";

export default function Article({ markdown, data, sorted_article_data }) {
    React.useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <div className="Article">
            <Head>
                <title key="title">{data.title} - OsbornAI</title>
                <meta
                    name="description"
                    content={data.description}
                    key="description"
                />
                <meta name="keywords" content={data.keywords} key="keywords" />
                {data.author !== null ? (
                    <meta name="author" content={data.author} key="author" />
                ) : (
                    <></>
                )}

                <meta property="og:type" content="article" key="ogType" />
                <meta
                    property="og:title"
                    content={`${data.title} - OsbornAI`}
                    key="ogTitle"
                />
                <meta
                    property="og:description"
                    content={data.description}
                    key="ogDescription"
                />
                <meta property="og:image" content={data.img} key="ogImage" />

                <meta
                    name="twitter:title"
                    content={`${data.title} - OsbornAI`}
                    key="twitterTitle"
                />
                <meta
                    name="twitter:description"
                    content={data.description}
                    key="twitterDescription"
                />
                {data.twitter !== null ? (
                    <meta
                        name="twitter:creator"
                        content={`@${data.twitter}`}
                        key="twitterCreator"
                    />
                ) : (
                    <></>
                )}
                <meta
                    name="twitter:image"
                    content={data.img}
                    key="twitterImage"
                />
                <meta
                    name="twitter:image:alt"
                    content={data.img_alt}
                    key="twitterImageAlt"
                />

                <meta
                    property="article:publisher"
                    content="https://twitter.com/BenOsbornAI"
                    key="articlePublisher"
                />
                {data.author_social !== null ? (
                    <meta
                        property="article:author"
                        content={data.author_social}
                    />
                ) : (
                    <meta
                        property="article:author"
                        content="https://twitter.com/BenOsbornAI"
                        key="articleAuthor"
                    />
                )}
                <meta
                    property="article:published_time"
                    content={parseBadDate(data.date_published).toISOString()}
                    key="articlePublishedTime"
                />
            </Head>
            <div className="container">
                <div className="container">
                    <div className="center">
                        <h1 style={{ fontWeight: 500 }}>{data.title}</h1>
                        <p className="flow-text" style={{ fontSize: 20 }}>
                            {data.author} - {data.date_published}
                        </p>
                        <p className="flow-text">{data.description}</p>
                        <br />
                        <img
                            className="responsive-img center"
                            alt={data.img_alt}
                            src={data.img}
                        />
                    </div>
                    <br />
                    <br />
                    <article className={style.markdown}>
                        <ReactMarkdown allowDangerousHtml={true}>
                            {markdown}
                        </ReactMarkdown>
                    </article>
                    <br />
                    <br />
                </div>
                <div className="center">
                    <p className="flow-text" style={{ fontSize: 30 }}>
                        Enjoyed this article? Check out our most recent posts!
                    </p>
                    <div className="row">
                        {sorted_article_data.length === 0 ? (
                            <div className="container">
                                <p
                                    className="flow-text"
                                    style={{ fontSize: 20 }}
                                >
                                    There are no other articles available at
                                    this time. Check back regularly to find the
                                    latest topics, news, and tutorials regarding
                                    all things data and business!
                                </p>
                            </div>
                        ) : (
                            sorted_article_data.slice(0, 3).map((article) => {
                                if (sorted_article_data.length === 1) {
                                    return (
                                        <div
                                            key={article.ref}
                                            className="col s12 m12 l12"
                                        >
                                            <ArticleCard
                                                path={article.ref}
                                                title={article.title}
                                                img={article.img}
                                                img_alt={article.img_alt}
                                                description={
                                                    article.description
                                                }
                                                date_published={
                                                    article.date_published
                                                }
                                                author={article.author}
                                            />
                                        </div>
                                    );
                                } else if (sorted_article_data.length === 2) {
                                    return (
                                        <div
                                            key={article.ref}
                                            className="col s12 m12 l6"
                                        >
                                            <ArticleCard
                                                path={article.ref}
                                                title={article.title}
                                                img={article.img}
                                                img_alt={article.img_alt}
                                                description={
                                                    article.description
                                                }
                                                date_published={
                                                    article.date_published
                                                }
                                                author={article.author}
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={article.ref}
                                            className="col s12 m12 l4"
                                        >
                                            <ArticleCard
                                                path={article.ref}
                                                title={article.title}
                                                img={article.img}
                                                img_alt={article.img_alt}
                                                description={
                                                    article.description
                                                }
                                                date_published={
                                                    article.date_published
                                                }
                                                author={article.author}
                                            />
                                        </div>
                                    );
                                }
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync("articles");
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".md", ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs
        .readFileSync(path.join("articles", slug + ".md"))
        .toString();
    const parsed_markdown = matter(markdown);

    const other_article_data = fs
        .readdirSync("articles")
        .filter((filename) => filename.replace(".md", "") !== slug)
        .map((filename) => {
            const md = fs.readFileSync(path.join("articles", filename));
            const parsed_md = matter(md);
            const data = parsed_md.data;

            return {
                ref: `/articles/${filename.replace(".md", "")}`,
                title: data.title,
                img: data.img,
                img_alt: data.img_alt,
                description: data.description,
                author: data.author,
                date_published: data.date_published,
            };
        });
    const sorted_article_data = other_article_data.sort((a, b) => {
        return parseBadDate(b.date_published) - parseBadDate(a.date_published);
    });

    return {
        props: {
            markdown: parsed_markdown.content,
            data: parsed_markdown.data,
            sorted_article_data,
        },
    };
}
