import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <div className="Header">
            <header>
                <div className="navbar-fixed">
                    <nav className="blue darken-1">
                        <div className="nav-wrapper center">
                            <Link href="/">
                                <a>
                                    <Image className="responsive-img" src="/headerLogo.png" alt="OsbornAI logo" width={300} height={50} />
                                </a>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};