import Book from './book';
import { Link } from 'react-scroll';

const Footer = () => {
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
                                <a class="col left" href="https://github.com/OsbornAI" style={{color: 'white', fontWeight: 500}} target="_blank" rel="noreferrer">GitHub</a>
                                <Link class="col center" href="/" to="Top" smooth={true} duration={400} style={{color: 'white', fontWeight: 500}}>Top Of Page</Link>
                                <a class="col right" href="https://www.linkedin.com/in/OsbornAI/" style={{color: 'white', fontWeight: 500}} target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div style={{fontSize: 14}}>
                        © Copyright OsbornAI {year}
                    </div>
                </div>
            </footer>
        </div>
    );
}



export default Footer;
