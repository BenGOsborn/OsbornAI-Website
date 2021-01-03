import { useEffect } from 'react';
import analytics from '../analytics';
import { Link } from 'react-scroll';

const Home = () => {
    useEffect(() => {
        analytics.init();
        analytics.sendPageview('/');

        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Home">
            <div class="container">
                <span id="About">
                    <div className="About">
                        <br />
                        <br />
                        <br />

                        <div class="row center valign-wrapper hide-on-med-and-down">
                            <div class="col s12 m12 l6">
                                <img class="responsive-img center" alt="Black and Gray Mining Rig"
                                src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" width="562.5" height="375"/>
                            </div>
                            <div class="col s12 m12 l6">
                                <p style={{fontSize: 23}}>
                                    <p>
                                        Data can be confusing, but it’s also essential to the success of your business. 
                                    </p>
                                    <p>
                                        Whether you’re a large company or a small business, correct usage of data will allow you to scale your 
                                        business to new heights and increase your revenue.
                                    </p>
                                </p>
                            </div>
                        </div>
                        <div class="row center hide-on-large-only">
                            <div class="col s12 m12 l12">
                                <img class="responsive-img center" alt="Black and Gray Mining Rig"
                                src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" width="562.5" height="375"/>
                            </div>
                            <div class="col s12 m12 l12">
                                <p style={{fontSize: 23}}>
                                    <p>
                                        Data can be confusing, but it’s also essential to the success of your business. 
                                    </p>
                                    <p>
                                        Whether you’re a large company or a small business, correct usage of data will allow you to scale your 
                                        business to new heights and increase your revenue.
                                    </p>
                                </p>
                            </div>
                        </div>
                        <br />
                        <p style={{fontSize: 20}}>
                            Here at OsbornAI, we understand the importance of data, so we make it our mission 
                            to help you use data in the most effective way for your business, so you can make 
                            smarter business decisions and tackle complex problems within your business. 
                        </p>
                    </div>
                </span>
                <span id="Services">
                    <div className="Services">
                        <br />
                        <br />
                        <br />
                        <b>
                            <p style={{fontSize: 23}}>
                                So what can we do for you?
                            </p>
                        </b>
                        <p style={{fontSize: 18}}>
                            Whether you want to know how data can help improve your business, or you have lots of data that you don’t know what to do with, we can help you.
                            Here's some of the service's we provide:
                        </p>
                        <div class="row">
                            <div class="col s12 m4 l4">
                            <div class="card">
                                <div class="card-image">
                                    <img alt="Person Holding Space Gray Iphone 6" src="https://images.pexels.com/photos/17663/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                                    <span class="card-title">
                                        <b>Consulting</b>
                                    </span>
                                </div>
                                <div class="card-content">
                                <p>
                                    We'll work with you to find ways in which data can help your business grow, then implement these systems for you.
                                </p>
                                </div>
                            </div>
                            </div>
                            <div class="col s12 m4 l4">
                            <div class="card">
                                <div class="card-image">
                                    <img alt="Blue Click Pen Near White Document Papers on Top of Brown Wooden Table" src="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                                    <span class="card-title">
                                        <b>Dashboards</b>
                                    </span>
                                </div>
                                <div class="card-content">
                                <p>
                                    We'll build you a beautiful data dashboard so you can easily visualize your businesses performance and make smart decisions. 
                                </p>
                                </div>
                            </div>
                            </div>
                            <div class="col s12 m4 l4">
                            <div class="card">
                                <div class="card-image">
                                    <img alt="Time Lapse Photography of Blue Lights" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260s" />
                                    <span class="card-title">
                                        <b>AI</b>
                                    </span>
                                </div>
                                <div class="card-content">
                                <p>
                                    We'll use cutting edge Aritifical Intelligence to automatically extract insights from your data and save you time.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <p style={{fontSize: 18}}>
                            And that’s just the beginning. If you’re interested in what we can do for your business, 
                            or have a project in mind that requires data, 
                            then <Link href="/" style={{color: 'black'}} to="Book" smooth={true} spy={true} duration={300}><b>book a consultation</b></Link> with us 
                            and let’s get started!
                        </p>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default Home;