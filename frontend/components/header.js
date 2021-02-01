import Link from 'next/link';
import Image from 'next/image';

export default function Header(props) {
    return (
        <div className="Header">
            <header>
                <div className="navbar-fixed">
                    <nav className="blue darken-1">
                        <div className="nav-wrapper valign-wrapper">
                            <div className="container center" style={{maxWidth: 300}}>
                                <Link href="/#Top" >
                                    <a><Image layout="responsive" src="/headerLogo.png" alt="OsbornAI logo" width={150} height={25} /></a>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};