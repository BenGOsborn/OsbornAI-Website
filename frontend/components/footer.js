import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer(props) {
    const linkStyle = {
        color: 'white',
    };

    const router = useRouter();
    const top_path = `${router.pathname}#Top`.replace(/\[.*?\]/, router.query.slug);

    return (
        <div className="Footer">
            <footer className="page-footer grey darken-4">
                <div className="container center">
                    <div className="container">
                        <div className="container">
                            <div className="container">
                                <Link className="center" href={top_path}><a style={{ color: 'white', fontWeight: 500 }}>Top Of Page</a></Link>
                            </div>
                            <br />
                            <div className="container row">
                                <a className="col s12 m12 l4" href="https://github.com/OsbornAI" target="_blank" rel="noreferrer" style={linkStyle}>GitHub</a>
                                <a className="col s12 m12 l4" href="https://twitter.com/BenOsbornAI" target="_blank" rel="noreferrer" style={linkStyle}>Twitter</a>
                                <a className="col s12 m12 l4" href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer" style={linkStyle}>LinkedIn</a>
                            </div>
                            <div className="container" style={{paddingBottom: 10}}>
                                <div className="row">
                                    <div className="col s12 m12 l6">
                                        <Link href="/#Top">
                                            <a style={linkStyle}>© Copyright OsbornAI {new Date().getFullYear()}</a>
                                        </Link>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <Link href="/legal/privacy-policy">
                                            <a style={linkStyle}>Privacy Policy</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};