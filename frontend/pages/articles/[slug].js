import React from 'react';
import fs from 'fs';

export default function Article({ slug }) {
    return (
        <div>
            I am a {slug}!
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
    return {
        props: {
            slug
        }
    };
};