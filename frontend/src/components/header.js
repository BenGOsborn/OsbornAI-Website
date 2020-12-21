import { Link } from 'react-scroll';

const Header = () => {
    return (
        <div className="Header">
            <header>

                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-3">
                            <a href="/" class="brand-logo center">OSBORNAI</a>
                            {/* This is meant to be the hamburger icon! */}
                            <a href="/" data-target="menu" class="sidenav-trigger">MENU</a>
                            <ul class="left hide-on-med-and-down"> 
                                <li><Link to="About" smooth={true} spy={true} duration={300}>ABOUT</Link></li>
                                <li><Link to="Services" smooth={true} spy={true} duration={300}>WHAT WE OFFER</Link></li>
                                <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
                                <li><Link to="Portfolio" smooth={true} spy={true} duration={300}>PREVIOUS WORK</Link></li>
                            </ul>
                            <ul class="right hide-on-med-and-down">
                                <li><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GITHUB</a></li>
                                <li><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YOUTUBE</a></li>
                                <li><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LINKEDIN</a></li>
                            </ul>
                        </div>
                    </nav>

                    {/* This is not being triggered properly */}
                    <ul class="sidenav" id="menu">
                        <li><Link to="About" smooth={true} spy={true} duration={300}>ABOUT</Link></li>
                        <li><Link to="Services" smooth={true} spy={true} duration={300}>WHAT WE OFFER</Link></li>
                        <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
                        <li><Link to="Portfolio" smooth={true} spy={true} duration={300}>PREVIOUS WORK</Link></li>
                        <li><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GITHUB</a></li>
                        <li><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YOUTUBE</a></li>
                        <li><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LINKEDIN</a></li>
                    </ul>
                </div>

        {/* I want to combine the fixed navbar and the squeezed navbar */}

            </header>
        </div>
    );
}

export default Header;