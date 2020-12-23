import { Link } from 'react-scroll';

const Services = () => {
    const whatWeDoStyle = {
        fontSize: 23
    };

    const textDefaultStyle = {
        fontSize: 18
    };

    const bookConsultStyle = {
        color: 'black'
    };

    return (
        <div className="Services">
            <br />
            <br />
            <br />
            <b>
                <p style={whatWeDoStyle}>
                    So what can we do for you?
                </p>
            </b>
            <p style={textDefaultStyle}>
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
            <p style={textDefaultStyle}>
                And that’s just the beginning. If you’re interested in what we can do for your business, 
                or have a project in mind that requires data, 
                then <Link href="/" style={bookConsultStyle} to="Book" smooth={true} spy={true} duration={300}><b>book a consultation</b></Link> with us and let’s get started!
            </p>
        </div>
    );
}

export default Services;