import React from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import style from '../../styles/Article.module.css';
import ArticleCard from '../../components/articleCard';

export default function Article({ markdown, data, other_article_data }) {
    return (
        <div className="Article">
            <Head>
                <title>{data.title} - OsbornAI</title>
                <meta name="description" content={data.description} />
                <meta name="keywords" content={data.keywords} />
                <meta name="author" content={data.author} />
            </Head>
            <div className="container">
                <div className="center">
                    <h1>{data.title}</h1>
                    <p className="flow-text" style={{fontSize: 20}}>{data.author} - {data.date_published}</p>
                    <p className="flow-text">{data.description}</p>
                </div>
                <br />
                <br />
                <article className={style.markdown}>
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </article>
                <br />
                <br />
                <div className="center">
                    <p className="flow-text" style={{fontSize: 23}}>
                        Enjoyed this article? Check out our most recent posts!
                    </p>
                    <div className="row">
                        {other_article_data.length === 0 ? 
                        <div className="container">
                            <p className="flow-text" style={{fontSize: 20}}>
                                There are no other articles available at this time. Check back regularly to find the latest news and tutorials regarding all 
                                things data science and machine learning!
                            </p>
                        </div>
                        :  other_article_data.slice(0, 3).map(article => {
                                if (other_articles.length === 1) {
                                    return (
                                        <div key={article.href} className="col s12 m12 l12">
                                            <ArticleCard path={article.href} title={article.title} date_published={article.date_published} author={article.author}  />
                                        </div>
                                    );

                                } else if (other_articles.length === 2) {
                                    return (
                                        <div key={article.href} className="col s12 m12 l6">
                                            <ArticleCard path={article.href} title={article.title} date_published={article.date_published} author={article.author}  />
                                        </div>
                                    );

                                } else {
                                    return (
                                        <div key={article.href} className="col s12 m12 l4">
                                            <ArticleCard path={article.href} title={article.title} date_published={article.date_published} author={article.author}  />
                                        </div>
                                    );
                                }
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync('articles');
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }));

    return {
        paths,
        fallback: false
    };
};

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs.readFileSync(path.join('articles', slug + '.md')).toString();
    const parsed_markdown = matter(markdown);
    
    const other_article_data = fs.readdirSync('articles').filter(filename => filename.replace('.md', '') !== slug).map(filename => {
        const md = fs.readFileSync(path.join('articles', filename));
        const parsed_md = matter(md);
        const data = parsed_md.data;

        return { ref: `/articles/${filename.replace('.md', '')}`, title: data.title, author: data.author, date_published: data.date_published };
    });

    return {
        props: {
            markdown: parsed_markdown.content,
            data: parsed_markdown.data,
            other_article_data: other_article_data
        }
    };
};