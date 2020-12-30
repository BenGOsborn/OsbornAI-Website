import About from './about';
import Services from './services';

const Home = () => {
    return (
        <div className="Home">
            <div class="container">
                <span id="About"><About /></span>
                <span id="Services"><Services /></span>
            </div>
        </div>
    );
};

export default Home;