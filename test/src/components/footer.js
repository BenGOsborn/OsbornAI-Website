import React from 'react';
import { Link } from 'react-scroll';
import { Link as WebLink, useLocation } from 'react-router-dom';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    const url = useLocation().pathname;

    const copyright = () => {
        if (url === "/") {
            return (
                <Link href="/" to="Top" smooth={true} duration={400} style={{fontSize: 14, color: 'white'}}>
                    © Copyright OsbornAI {year}
                </Link>
            );
        } else {
            return (
                <WebLink to="/" style={{fontSize: 14, color: 'white'}}>
                    © Copyright OsbornAI {year}
                </WebLink>
            );
        }
    };

    return (
        <div className="Footer">
            <footer class="page-footer grey darken-4">
                <div class="container center">
                    <div class="container">
                        <div class="container">
                            <div class="container">
                                <a class="col left" href="https://github.com/OsbornAI" style={{color: 'white', fontWeight: 500}} target="_blank" rel="noreferrer">GitHub</a>
                                <Link class="col center" href="/" to="Top" smooth={true} duration={400} style={{color: 'white', fontWeight: 500}}>Top Of Page</Link>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" style={{color: 'white', fontWeight: 500}} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    {copyright()}
                </div>
            </footer>
        </div>
    );
}



export default Footer;
