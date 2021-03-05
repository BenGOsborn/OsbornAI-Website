import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Head from 'next/head';
import ArticleCard from '../../components/articleCard';
import { parseBadDate } from '../../extras/helpers';

export default function Articles({ sorted_article_data }) {
    const [page, setPage] = React.useState(1);
    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const page_size = 20;

    React.useEffect(() => {
        const handleScroll = (event) => {
            if ((document.body.scrollHeight - window.scrollY < 1600) && (loading === false)) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    React.useEffect(() => {
        setLoading(true);
        const new_articles = sorted_article_data.slice((page - 1) * page_size, page * page_size);
        if (new_articles.length !== 0) {
            setArticles(prev => [...prev, ...new_articles]);
            setLoading(false);
        }
    }, [page]);

    return (
        <div className="Articles">
            <Head>
                <title key="title">Explore Our Articles - OsbornAI</title>
                <meta name="description" content="The full list of our existing articles containing the latest topics, news, and tutorials regarding all things data science!" key="description" />
                <meta name="keywords" content="articles, data science, ai, machine learning, news, blog, tutorials, osbornai, posts, blogs, education, guides, artificial intelligence, data" key="keywords" />

                <meta property="og:type" content="blog" key="ogType" />
                <meta property="og:title" content="Explore Our Articles - OsbornAI" key="ogTitle" />
                <meta property="og:description" content="The full list of our existing articles containing the latest topics, news, and tutorials regarding all things data science!" key="ogDescription" />

                <meta name="twitter:title" content="Explore Our Articles - OsbornAI" key="twitterTitle" />
                <meta name="twitter:description" content="The full list of our existing articles containing the latest topics, news, and tutorials regarding all things data science!" key="twitterDescription" />
            </Head>
            <br />
            <br />
            <div className="container center" >
                <p style={{fontSize: 27.5, fontWeight: 475}} className="flow-text">
                    Here's a list of our existing articles. Check back regularly to find
                    the latest topics, news, and tutorials regarding all things data and business!
                </p>
                <br />
                <br />
                <div className="row">
                    {articles.map(article => {
                        if ((articles.length % 2 !== 0) && (article.ref === articles[articles.length - 1].ref)) {
                            return (
                                <div key={article.ref} className="col s12 m12 l12">
                                    <ArticleCard path={article.ref} title={article.title} description={article.description} img={article.img} img_alt={article.img_alt} author={article.author} date_published={article.date_published} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={article.ref} className="col s12 m12 l6">
                                    <ArticleCard path={article.ref} title={article.title} description={article.description} img={article.img} img_alt={article.img_alt} author={article.author} date_published={article.date_published} />
                                </div>
                            );
                        }
                    })}
                </div>
                <br />
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const article_data = fs.readdirSync('articles').map(filename => {
        const markdown = fs.readFileSync(path.join('articles', filename));
        const parsed_markdown = matter(markdown);
        const data = parsed_markdown.data;

        return { ref: `/articles/${filename.replace('.md', '')}`, title: data.title, description: data.description, img: data.img, img_alt: data.img_alt, author: data.author, date_published: data.date_published };
    });
    const sorted_article_data = article_data.sort((a, b) => { 
        return parseBadDate(b.date_published) - parseBadDate(a.date_published);
    });

    return {
        props: {
            sorted_article_data
        }
    };
};