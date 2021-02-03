import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer(props) {
    const linkStyle = {
        color: 'white',
        fontWeight: 500
    };

    const router = useRouter();
    const top_path = `${router.pathname}#Top`.replace(/\[.*?\]/, router.query.slug);

    return (
        <div className="Footer">
            <footer className="page-footer grey darken-4">
                <div className="container center">
                    <div className="container">
                        <div className="container">
                            <div className="container row">
                                <a className="col left" href="https://github.com/OsbornAI" target="_blank" rel="noreferrer" style={linkStyle}>GitHub</a>
                                <Link className="col center" href={top_path}><a style={linkStyle}>Top Of Page</a></Link>
                                <a className="col right" href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer" style={linkStyle}>LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingBottom: 10}}>
                        <Link href={top_path}>
                            <a style={{color: 'white'}}>© Copyright OsbornAI {new Date().getFullYear()}</a>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};