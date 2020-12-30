import { Link } from 'react-scroll';
import { HashLink } from 'react-router-hash-link';
import { Link as RouteLink, useLocation } from 'react-router-dom';

const Header = () => {
    const url = useLocation().pathname;

    const links = () => {
        if (url === "/") {
            return (
                <>
                    <li><Link to="About" smooth={true} spy={true} duration={300}>ABOUT</Link></li>
                    <li><Link to="Services" smooth={true} spy={true} duration={300}>SERVICES</Link></li>
                </>
            );
        } else {
            return (
                <>
                    {/* It is not navigating to the component properly */}
                    <li><HashLink smooth to="/#About">ABOUT</HashLink></li> 
                    <li><HashLink smooth to="/#Services">SERVICES</HashLink></li>
                </>
            );
        }
    };            

    return (
        <div className="Header">
            <header>
                <ul id="slide-out" class="sidenav">

                    {links()}
                    <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
                    <li><RouteLink to="/articles">ARTICLES</RouteLink></li>

                </ul>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1">
                            <a href="/" class="brand-logo center">OSBORNAI</a>
                            <a href="/" data-target="slide-out" class="sidenav-trigger">
                                <i class="material-icons right">menu</i>
                            </a>
                            <div class="hide-on-med-and-down">
                                <ul class="left"> 
                                    {links()}
                                </ul>
                                <ul class="right">
                                    <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
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