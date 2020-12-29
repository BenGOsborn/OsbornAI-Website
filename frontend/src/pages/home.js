import About from './about';
import Services from './services';

const Home = () => {
    return (
        <div className="Home">
            <div class="container">
                <About />
                <Services />
            </div>
        </div>
    );
};

export default Home;