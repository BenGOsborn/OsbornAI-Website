import { Link } from 'react-scroll';

const Header = () => {
    return (
        <div className="Header">
            <header>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="Home" smooth={true} spy={true} duration={300}>HOME</Link></li>
                    <li><Link to="Services" smooth={true} spy={true} duration={300}>SERVICES</Link></li>
                    <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
                    {/* <li><Link to="Portfolio" smooth={true} spy={true} duration={300}>PORTFOLIO</Link></li> */}
                    <li><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GITHUB</a></li>
                    <li><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YOUTUBE</a></li>
                    <li><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LINKEDIN</a></li>
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
                                    <li><Link to="Book" smooth={true} spy={true} duration={300}>BOOK A CONSULT</Link></li>
                                    {/* <li><Link to="Portfolio" smooth={true} spy={true} duration={300}>PORTFOLIO</Link></li> */}
                                </ul>
                                <ul class="right">
                                    <li><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GITHUB</a></li>
                                    <li><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YOUTUBE</a></li>
                                    <li><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LINKEDIN</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;