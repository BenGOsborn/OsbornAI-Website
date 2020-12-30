import About from './about';
import Services from './services';

const Home = () => {
    return (
        <div className="Home">
            <div class="container">
                <About id="About" />
                <Services id="Services" />
            </div>
        </div>
    );
};

export default Home;