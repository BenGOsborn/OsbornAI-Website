import Link from 'next/link';

export default function Footer(props) {
    const linkStyle = {
        color: 'white',
        fontWeight: 500
    };

    return (
        <div className="Footer">
            <footer className="page-footer grey darken-4">
                <div className="container center">
                    <div className="container">
                        <div className="container">
                            <div className="container row">
                                <a className="col left" href="https://github.com/OsbornAI" target="_blank" rel="noreferrer" style={linkStyle}>GitHub</a>
                                <Link className="col center" href="/#Top"><a style={linkStyle}>Top Of Page</a></Link>
                                <a className="col right" href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer" style={linkStyle}>LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingBottom: 10}}>
                        <Link href="/#Top">
                            <a style={linkStyle}>© Copyright OsbornAI {new Date().getFullYear()}</a>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};