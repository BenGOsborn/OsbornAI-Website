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
                    <div class="container">
                        <div class="container">
                            <div class="container">
                                <a class="col left" href="https://github.com/OsbornAI" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
                                <a class="col center" href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" style={linkStyle} target="_blank" rel="noreferrer">YouTube</a>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" style={linkStyle} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={copyrightStyle}>
                        © Copyright OsbornAI 2020
                    </div>
                </div>
            </footer>
        </div>
    );
}



export default Footer;
