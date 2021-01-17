import { Link } from 'react-router-dom';
import headerLogo from './header-logo.png';

const AdminHeader = () => {
    return (
        <div className="AdminHeader">
            <div className="Top" />
            <header>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1 center">
                            <Link class="brand-logo center" href="/" to="/" smooth={true} duration={400} style={{fontSize: 34}}>
                                <div class="valign-wrapper row">
                                    <div class="col valign-wrapper">
                                        <img class="center" src={headerLogo} alt="OsbornAI logo" width="42" height="42"/>
                                    </div>
                                    <div class="col valign-wrapper">
                                        OSBORNAI
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default AdminHeader;