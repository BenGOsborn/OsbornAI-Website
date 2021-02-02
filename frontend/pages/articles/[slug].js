import React from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import marked from 'marked';

export default function Article({ html, data }) {
    return (
        <div className="Article">
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.description} />
                <meta name="keywords" content={data.keywords} />
                <meta name="author" content={data.author} />
            </Head>
            <div className="container">
                <div dangerouslySetInnerHTML={{__html: html}} />
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
    const html_string = marked(parsed_markdown.content);

    return {
        props: {
            html: html_string,
            data: parsed_markdown.data
        }
    };
};