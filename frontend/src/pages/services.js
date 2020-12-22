const Services = () => {
    const whatWeDoStyle = {
        fontSize: 23
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

            <p>
                Whether you want to know how data can help improve your business, or you have lots of data that you don’t know what to do with, we can help you.
                Here's some of the service's we can help you with.
            </p>
            
            <div class="row">
                <div class="col s1 m4 l4">
                <div class="card">
                    <div class="card-image">
                        <img alt="Man Holding Black Smartphone" src="https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&h=750&w=12600" />
                        <span class="card-title">
                            Consulting
                        </span>
                    </div>
                    <div class="card-content">
                    <p>
                        We'll work with you to find ways to apply to apply data to your business to help you grow.
                    </p>
                    </div>
                </div>
                </div>

                <div class="col s1 m4 l4">
                <div class="card">
                    <div class="card-image">
                        <img alt="Time Lapse Photography of Blue Lights" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260s" />
                        <span class="card-title">AI</span>
                    </div>
                    <div class="card-content">
                    <p>
                        We'll use cutting edge Aritifical Intelligence algorithms to help you scale your business.
                    </p>
                    </div>
                </div>
                </div>

                <div class="col s1 m4 l4">
                <div class="card">
                    <div class="card-image">
                        <img alt="Time Lapse Photography of Blue Lights" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260s" />
                        <span class="card-title">AI</span>
                    </div>
                    <div class="card-content">
                    <p>
                        We'll use cutting edge Aritifical Intelligence algorithms to help you scale your business.
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* <ul>
                <li>Finding ways to apply data to your business</li>
                <li>Handling, analysing and visualizing your data</li>
                <li>Designing and building new data systems specific to your business</li>
                <li>Building beautiful dashboards for your data</li>
                <li>Reporting analytics to you</li>
                <li>Creation of Artificial intelligence systems to help with your business</li>
            </ul> */}

        </div>
    );
}

export default Services;