import Link from 'next/link';

export default function Footer(props) {
    const style = {
        color: 'white',
        fontWeight: 500
    };

    return (
        <div className="Footer">
            <footer class="page-footer grey darken-4">
                <div class="container center">
                    <div class="container">
                        <div class="container">
                            <div class="container row">
                                <a class="col left" href="https://github.com/OsbornAI" target="_blank" rel="noreferrer" style={style}>GitHub</a>
                                <Link class="col center" href="/#Top"><a style={style}>Top Of Page</a></Link>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer" style={style}>LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingBottom: 10}}>
                        <Link href="/#Top">
                            <a style={style}>© Copyright OsbornAI {new Date().getFullYear()}</a>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};