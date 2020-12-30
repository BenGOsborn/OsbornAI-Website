import { Link } from 'react-scroll';
import { Link as RouteLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="Header">
            <header>
                <ul id="slide-out" class="sidenav">

                    {/* How am I going to have these link to other pages and go to the correct section */}
                    <li><Link to="Home" smooth={true} spy={true} duration={300}>HOME</Link></li>
                    <li><Link to="Services" smooth={true} spy={true} duration={300}>SERVICES</Link></li>
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
                                    <li><Link to="Home" smooth={true} spy={true} duration={300}>HOME</Link></li>
                                    <li><Link to="Services" smooth={true} spy={true} duration={300}>SERVICES</Link></li>
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