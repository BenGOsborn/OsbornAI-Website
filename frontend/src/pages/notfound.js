import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-scroll';
import { Link as RouteLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="NotFound">
            <div class="container">
                <div class="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3>The page you're looking for does not exist!</h3>
                    <div class="container">
                        <p class="flow-text">
                            Here are some links to help you find what you're looking for:
                        </p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div class="row center" style={{fontSize: 20}}>
                    <b>
                        <HashLink class="col s12 m12 l3" to="/#About" smooth={true}>ABOUT</HashLink>
                        <HashLink class="col s12 m12 l3" to="/#Services" smooth={true}>SERVICES</HashLink>
                        <RouteLink class="col s12 m12 l3" to="/articles" smooth={true}>ARTICLES</RouteLink>
                        <Link href="/" to="Book" smooth={true} duration={400}>BOOK A CONSULT</Link>
                    </b>
                </div>
            </div>
        </div>
    );
};

export default NotFound;