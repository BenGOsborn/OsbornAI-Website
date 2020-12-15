const Header = () => {
    return (
        <div className="Header">
            <header>
                <nav>
                    <div class="nav-wrapper blue darken-3">
                    <a href="/" class="brand-logo center">OsbornAI</a>
                    <ul id="nav-mobile" class="right">
                        <li key="GitHub"><a href="https://github.com/OsbornAI" target="_blank" rel="noreferrer">GitHub</a></li>
                        <li key="YouTube"><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw" target="_blank" rel="noreferrer">YouTube</a></li>
                        <li key="LinkedIn"><a href="https://www.linkedin.com/in/OsbornAI/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;