import Link from 'next/link';
import Image from 'next/image';

export default function Header(props) {
    return (
        <div className="Header">
            <header>
                <ul id="slide-out" class="sidenav">
                    <li><Link href="/#About">ABOUT</Link></li>
                    <li><Link href="/#Services">SERVICES</Link></li>
                    <li><Link href="/#Book">BOOK A CONSULT</Link></li>
                    <li><Link href="/articles">ARTICLES</Link></li>
                </ul>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1">
                            <div className="brand-logo center">
                                <Link href="/#Top">
                                    <a>
                                        <div style={{paddingTop: 4}}>
                                            <Image layout="intrinsic" src="/headerLogo.png" alt="OsbornAI logo" width={345} height={57.5} />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <a href="/" data-target="slide-out" class="sidenav-trigger">
                                <i class="material-icons right">menu</i>
                            </a>
                            <div class="hide-on-med-and-down">
                                <div style={{paddingLeft: 80, paddingRight: 80}}>
                                    <ul class="left"> 
                                        <li><Link href="/#About">ABOUT</Link></li>
                                        <li><Link href="/#Services">SERVICES</Link></li>
                                    </ul>
                                    <ul class="right">
                                        <li><Link href="/#Book">BOOK A CONSULT</Link></li>
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