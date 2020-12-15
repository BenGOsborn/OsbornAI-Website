import { useState } from 'react';
import About from '../pages/about';
import Services from '../pages/services';
import Book from '../pages/book';
import Portfolio from '../pages/portfolio';

const Info = () => {
    let [page, setPage] = useState(0);

    return (
        <div className="Info">
            <div className="Buttons">
                <button onClick={e => setPage(0)}>About</button>
                <button onClick={e => setPage(1)}>What We Offer</button>
                <button onClick={e => setPage(2)}>Book A Consult</button>
                <button onClick={e => setPage(3)}>Portfolio</button>
            </div>
            <div className="PageSource">
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