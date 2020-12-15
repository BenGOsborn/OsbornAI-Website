import { useState } from 'react';
import About from '../pages/about';
import Services from '../pages/services';
import Book from '../pages/book';
import Portfolio from '../pages/portfolio';

const Info = () => {
    let [page, setPage] = useState(0);
    let [pageTitle, setPageTitle] = useState('About');

    return (
        <div className="Info">

            <nav class="nav-extended blue darken-1">
                <div class="nav-content">
                    <ul class="tabs tabs-transparent">
                        <li class="tab"><button class="btn-flat" onClick={e => {setPage(0);setPageTitle('About')}}>About</button></li>
                        <li class="tab"><button class="btn-flat" onClick={e => {setPage(1);setPageTitle('What We Offer')}}>What We Offer</button></li>
                        <li class="tab"><button class="btn-flat" onClick={e => {setPage(2);setPageTitle('Book A Consult')}}>Book A Consult</button></li>
                        <li class="tab"><button class="btn-flat" onClick={e => {setPage(3);setPageTitle('Portfolio')}}>Portfolio</button></li>
                    </ul>
                </div>
            </nav>

            <div className="PageSource" class="container center flow-text">
                {PageSource(page)}
            </div>
        </div>
    );
}

const PageSource = (page_num) => {
    if (page_num === 1) {
        return <Services />;

    } else if (page_num === 2) {
        return <Book />;

    } else if (page_num === 3) {
        return <Portfolio />;

    } else {
        return <About />;
    }
}

export default Info;