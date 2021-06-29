import Link from "next/link";

export default function Home(props) {
    return (
        <div className="Home">
            <div className="container">
                <span id="About">
                    <div className="About">
                        <br />
                        <br />
                        <br />
                        <div className="row center valign-wrapper hide-on-med-and-down">
                            <div className="col s12 m12 l6">
                                <img
                                    className="responsive-img"
                                    alt="Black and Gray Mining Rig"
                                    src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                    width="562.5"
                                    height="375"
                                    style={{
                                        objectFit: "contain",
                                        minWidth: 375,
                                    }}
                                />
                            </div>
                            <div
                                className="dynamic-text col s12 m12 l6"
                                style={{ paddingLeft: 50, paddingRight: 50 }}
                            >
                                <p>
                                    Data can be confusing, but it’s also
                                    essential to the success of your business.
                                </p>
                                <p>
                                    Whether you’re a large company or a small
                                    business, correct usage of data will allow
                                    you to scale your business to new heights
                                    and increase your revenue.
                                </p>
                            </div>
                        </div>
                        <div className="row hide-on-large-only">
                            <div className="col center s12 m12 l12">
                                <img
                                    className="responsive-img"
                                    alt="Black and Gray Mining Rig"
                                    src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                    width="843.75"
                                    height="562.5"
                                />
                            </div>
                            <div className="col s12 m12 l12">
                                <div style={{ fontSize: 21 }}>
                                    <p>
                                        Data can be confusing, but it’s also
                                        essential to the success of your
                                        business.
                                    </p>
                                    <p>
                                        Whether you’re a large company or a
                                        small business, correct usage of data
                                        will allow you to scale your business to
                                        new heights and increase your revenue.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div style={{ fontSize: 20 }}>
                            <p>
                                Here at OsbornAI, we understand the importance
                                of data to growing your business and increasing
                                your revenue, so we make it our mission to help
                                you use data in the most effective way for your
                                business, so you can make smarter business
                                decisions and tackle complex problems within
                                your business.
                            </p>
                        </div>
                    </div>
                </span>
                <span id="Services">
                    <div className="Services">
                        <br />
                        <br />
                        <br />
                        <b>
                            <p style={{ fontSize: 23 }}>
                                So what can we do for you?
                            </p>
                        </b>
                        <p style={{ fontSize: 18 }}>
                            Whether you're curious about how data can help
                            improve your business or you need a solution to your
                            rapidly growing data that your current system can't
                            handle, we'll work with you to find the most optimal
                            and scalable solution for your problem and implement
                            these solutions for you quickly and effectively.
                            Listed below are some examples of what we can do for
                            you and your business:
                        </p>
                        <div className="row">
                            <div className="col s12 m4 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img
                                            alt="Black and Gray Laptop on Black Sectional Couch"
                                            src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                        />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <b>
                                                Data Analysis and Insight
                                                Extraction
                                            </b>
                                        </span>
                                        <p>
                                            Got lots of data but no idea what to
                                            do with it? We'll transform your raw
                                            data, regardless of the type of data
                                            into meaningful insights, reports,
                                            and visualizations, allowing you to
                                            understand your target audience and
                                            their behaviors, helping you to make
                                            smarter business decisions and focus
                                            on critical areas within your
                                            business.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m4 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img
                                            alt="Photo of Person Typing on Computer Keyboard"
                                            src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                        />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <b>
                                                Data Collection and Metric
                                                Tracking
                                            </b>
                                        </span>
                                        <p>
                                            Looking to get started with big data
                                            and analytics but not sure how?
                                            We'll work with you to design and
                                            implement data tracking and
                                            collection systems for the most
                                            important metrics regarding your
                                            business that will yield the most
                                            insights about your while minimizing
                                            the amount of data collected, saving
                                            you money.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m4 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <img
                                            alt="Server racks in modern data center"
                                            src="https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                        />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <b>Data Storage Solutions</b>
                                        </span>
                                        <p>
                                            In need of a new place to store your
                                            data? We'll work with you to find
                                            and implement a scalable data
                                            storage solution that suits your
                                            business's needs for now and the
                                            future, saving you future hassles
                                            and excess expenses. We will also
                                            work with you to implement custom
                                            ETL data pipelines that take your
                                            raw data and automatically transform
                                            and store it for quick access when
                                            you're making critical business
                                            decisions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: 18 }}>
                            And that’s just the beginning. If you’re interested
                            in what data can do for your business, or have a
                            project in mind that involves data, then{" "}
                            <b>
                                <Link href="/#Inquire">
                                    <a>inquire about a consult</a>
                                </Link>
                            </b>{" "}
                            with us below and let’s get started!
                        </p>
                    </div>
                </span>
            </div>
        </div>
    );
}
