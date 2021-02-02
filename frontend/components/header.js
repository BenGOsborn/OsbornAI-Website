import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header(props) {
    const router = useRouter();
    const book_path = `${router.pathname}#Book`;

    return (
        <div className="Header">
            <header>
                <ul id="slide-out" className="sidenav">
                    <li><Link href="/#About">ABOUT</Link></li>
                    <li><Link href="/#Services">SERVICES</Link></li>
                    <li><Link href={book_path}>BOOK A CONSULT</Link></li>
                    <li><Link href="/articles">ARTICLES</Link></li>
                </ul>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper blue darken-1">
                            <a href="/" data-target="slide-out" className="sidenav-trigger">
                                <i className="material-icons left">menu</i>
                            </a>
                            <div className="brand-logo center">
                                <Link href="/#Top">
                                    <a>
                                        <div style={{paddingTop: 4}}>
                                            <Image layout="intrinsic" src="/headerLogo.png" alt="OsbornAI logo" width={345} height={57.5} />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="hide-on-med-and-down">
                                <div style={{paddingLeft: 80, paddingRight: 80}}>
                                    <ul className="left"> 
                                        <li><Link href="/#About">ABOUT</Link></li>
                                        <li><Link href="/#Services">SERVICES</Link></li>
                                    </ul>
                                    <ul className="right">
                                        <li><Link href={book_path}>BOOK A CONSULT</Link></li>
                                        <li><Link href="/articles">ARTICLES</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};