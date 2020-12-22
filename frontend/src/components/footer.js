import { Link } from 'react-scroll';

const Footer = () => {
    const linkStyle = {
        color: 'white'
    };

    const copyrightStyle = {
        fontSize: 14
    };

    return (
        <div className="Footer">
            <footer class="page-footer grey darken-4">
                <div class="container center">
                    <div class="row">
                        {/* There is some strange stuff going on with the rows when they are resized */}
                        <div class="col left">
                            <div class="row">
                                <Link class="col left" href="/" style={linkStyle} to="Home" smooth={true} spy={true} duration={300}>Home</Link>
                                <Link class="col center" href="/" style={linkStyle} to="Services" smooth={true} spy={true} duration={300}>Services</Link>
                                <Link class="col right" href="/" style={linkStyle} to="Book" smooth={true} spy={true} duration={300}>Book A Consult</Link>
                                {/* <li><Link href="/" style={linkStyle} to="Portfolio" smooth={true} spy={true} duration={300}>PORTFOLIO</Link></li> */}
                            </div>
                        </div>
                        <div class="col right">
                            <div class="row">
                                <a class="col left" href="https://github.com/OsbornAI" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
                                <a class="col center" href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" style={linkStyle} target="_blank" rel="noreferrer">YouTube</a>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" style={linkStyle} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div style={copyrightStyle}>
                        © Copyright OsbornAI 2020
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
