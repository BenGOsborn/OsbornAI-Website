const Nav = () => {
    return (
        <div className="Nav">
            <header>
                <ul>
                    <b>
                        {/* How to get it to come up by iteself */}
                        <li key="OsbornAI" target="_blank"><a href="#">OsbornAI</a></li>
                        <li key="GitHub" target="_blank"><a href="https://github.com/OsbornAI">GitHub</a></li>
                        <li key="YouTube" target="_blank"><a href="https://www.youtube.com/channel/UCVm_tIEM4uu5HrMT2tG5hVw">YouTube</a></li>
                        <li key="LinkedIn" target="_blank"><a href="https://www.linkedin.com/in/OsbornAI/">LinkedIn</a></li>
                    </b>
                </ul>
            </header>
        </div>
    );
}

export default Nav;