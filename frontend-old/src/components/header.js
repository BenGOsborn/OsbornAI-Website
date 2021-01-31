import React from 'react';
import { Link } from 'react-scroll';
import { HashLink } from 'react-router-hash-link';
import { Link as RouteLink, useLocation } from 'react-router-dom';
import headerLogo from './header-logo.png';

const Header = () => {
    const url = useLocation().pathname;

    const title = () => {
        if (url === "/") {
            return (
                <Link class="brand-logo center" href="/" to="Top" smooth={true} duration={400} style={{fontSize: 34}}>
                    <div class="valign-wrapper row">
                        <div class="col valign-wrapper">
                            <img class="center" src={headerLogo} alt="OsbornAI logo" width="42" height="42"/>
                        </div>
                        <div class="col valign-wrapper">
                            OSBORNAI
                        </div>
                    </div>
                </Link>
            );
        } else {
            return (
                <RouteLink class="brand-logo center" to="/" style={{fontSize: 34}}>
                    <div class="valign-wrapper row">
                        <div class="col valign-wrapper">
                            <img class="center" src={headerLogo} alt="OsbornAI logo" width="42" height="42"/>
                        </div>
                        <div class="col valign-wrapper">
                            OSBORNAI
                        </div>
                    </div>
                </RouteLink>
            );
        }
    };

    const links = () => {
        if (url === "/") {
            return (
                <>
                    <li><Link href="/" to="About" smooth={true} duration={400}>ABOUT</Link></li>
                    <li><Link href="/" to="Services" smooth={true} duration={400}>SERVICES</Link></li>
                </>
            );
        } else {
            return (
                <>
                    <li><HashLink href="/" to="/#About" smooth={true}>ABOUT</HashLink></li> 
                    <li><HashLink href="/" to="/#Services" smooth={true}>SERVICES</HashLink></li>
                </>
            );
        }
    };          
    
    return (
        <div className="Header">
            <div className="Top" />
            <header>
                <ul id="slide-out" class="sidenav">
                    {links()}
                    <li><Link href="/" to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link></li>
                    <li><RouteLink to="/articles">ARTICLES</RouteLink></li>
                </ul>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1">
                            {title()}
                            <a href="/" data-target="slide-out" class="sidenav-trigger">
                                <i class="material-icons right">menu</i>
                            </a>
                            <div class="hide-on-med-and-down">
                                <div class="container">
                                    <ul class="left"> 
                                        {links()}
                                    </ul>
                                    <ul class="right">
                                        <li><Link to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link></li>
                                        <li><RouteLink to="/articles">ARTICLES</RouteLink></li>
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

export default Header;