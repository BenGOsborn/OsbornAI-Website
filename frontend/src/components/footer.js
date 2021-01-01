import Book from './book';

const Footer = () => {
    const linkStyle = {
        color: 'white'
    };

    const copyrightStyle = {
        fontSize: 14
    };

    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="Footer">
            <div class="container">
                <Book />
            </div>
            <footer class="page-footer grey darken-4">
                <div class="container center">
                    <div class="container">
                        <div class="container">
                            <div class="container">
                                <a class="col left" href="https://github.com/OsbornAI" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" style={linkStyle} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={copyrightStyle}>
                        © Copyright OsbornAI {year}
                    </div>
                </div>
            </footer>
        </div>
    );
}



export default Footer;
