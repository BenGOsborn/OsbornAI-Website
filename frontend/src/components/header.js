import { Link } from 'react-scroll';

const Header = () => {
    return (
        <div className="Header">
            <header>
                <div className="Main-Nav">
                    <nav>
                        <div class="nav-wrapper blue darken-3">
                        <a href="/" class="brand-logo center">OsbornAI</a>
                        <ul id="nav-mobile" class="right">
                            <li key="GitHub"><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GitHub</a></li>
                            <li key="YouTube"><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YouTube</a></li>
                            <li key="LinkedIn"><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                        </ul>
                        </div>
                    </nav>
                </div>
                <div className="Extended-Nav">
                    <nav class="nav-extended blue darken-1">
                        <div class="nav-content">
                            <ul class="tabs tabs-transparent"> 
                                <li class="tab"><Link to="About" smooth={true} duration={300}>About</Link></li>
                                <li class="tab"><Link to="Services" smooth={true} duration={300}>What we offer</Link></li>
                                <li class="tab"><Link to="Book" smooth={true} duration={300}>Book a consult</Link></li>
                                <li class="tab"><Link to="Portfolio" smooth={true} duration={300}>Previous work</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;