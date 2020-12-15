import { useState } from 'react';

const Content = () => {
    let [page, changePage] = useState(0);

    return (
        <div className="Content">
            <button onClick={e => {
                changePage(0);
            }}>About</button>
            <button onClick={e => {
                changePage(1);
            }}>What We Offer</button>
            <button onClick={e => {
                changePage(2);
            }}>Book A Consult</button>
            <button onClick={e => {
                changePage(3);
            }}>Portfolio</button>
            {() => {
                if (page === 0) {
                    return (
                        <div>
                            About
                        </div>
                    );
                } else if (page === 1) {
                    return (
                        <div>
                            What We Offer
                        </div>
                    );
                } else if (page === 2) {
                    return (
                        <div>
                            Book A Consult
                        </div>
                    );
                } else {
                    return (
                        <div>
                            Portfolio
                        </div>
                    );
                }
            }} 
        </div>
    );
}

export default Content;