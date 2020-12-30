import { Link } from 'react-scroll';
import { HashLink } from 'react-router-hash-link';
import { Link as RouteLink, useLocation } from 'react-router-dom';

const Header = () => {
    const url = useLocation().pathname;

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
            <header>
                <ul id="slide-out" class="sidenav">
                    {links()}
                    <li><Link href="/" to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link></li>
                    <li><RouteLink to="/articles">ARTICLES</RouteLink></li>

                </ul>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1">
                            <HashLink class="brand-logo center" to="/#top" smooth={true}>OSBORNAI</HashLink>
                            <a href="/" data-target="slide-out" class="sidenav-trigger">
                                <i class="material-icons right">menu</i>
                            </a>
                            <div class="hide-on-med-and-down">
                                <ul class="left"> 
                                    {links()}
                                </ul>
                                <ul class="right">
                                    <li><Link to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link></li>
                                    <li><RouteLink to="/articles">ARTICLES</RouteLink></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;