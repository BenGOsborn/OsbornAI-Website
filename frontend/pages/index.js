import Link from 'next/link';
import { sendEvent } from '../extras/analytics';

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
								<img className="responsive-img center" alt="Black and Gray Mining Rig"
								src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" width="562.5" height="375"/>
							</div>
							<div className="col s12 m12 l6">
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
						<div className="row center hide-on-large-only">
							<div className="col s12 m12 l12">
								<img className="responsive-img center" alt="Black and Gray Mining Rig"
								src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" width="562.5" height="375"/>
							</div>
							<div className="col s12 m12 l12">
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
							Whether you want to know how data can help improve your business, or your growing business is collecting too much data that you don't know what to do with, we 
							will work with you to find the best course of action to achieve your desired outcome and then implement these solutions for you quickly and in a way that will 
							scale for however large your business may grow. Here's just a few of the problems we can help you with:
						</p>
						<div className="row">
							<div className="col s12 m6 l6">
								<div className="card">
									<div className="card-image">
										<img alt="Black and Gray Laptop on Black Sectional Couch" src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
									</div>
									<div className="card-content">
										<span className="card-title">
											<b>Data Analysis and Insight Extraction</b>
										</span>
										<p>
											Got lots of data but no idea what to do with it? We'll transform your raw useless data into meaningful insights, reports
											and visualizations that will allow you to understand your target audience and customer behaviours, helping you to make smarter business decisions 
											and understand and focus on critical areas within your business.
										</p>
									</div>
								</div>
							</div>
							<div className="col s12 m6 l6">
								<div className="card">
									<div className="card-image">
										<img alt="Photo of Person Typing on Computer Keyboard" src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
									</div>
									<div className="card-content">
										<span className="card-title">
											<b>Data Collection and Metric Tracking</b>
										</span>
										<p>
											Looking to get started with big data and analytics but not sure how to start? We'll work with you to find the most important metrics to track for your business 
											that will yield the most insights about your business while minimizing the amount of data you collect to save you money, as well as working with you to integrate 
											these tracking systems into your current business. </p>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col s12 m4 l4">
								<div className="card">
									<div className="card-image">
										<img alt="Server racks in modern data center" src="https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
									</div>
									<div className="card-content">
										<span className="card-title">
											<b>Data Storage Solutions</b>
										</span>
										<p>In need of a new place to store your data? We'll work with you to find and implement the storage solution that will suit you and your business in the most 
											cost effective and scalable way.
										</p>
									</div>
								</div>
							</div>
							<div className="col s12 m4 l4">
								<div className="card">
									<div className="card-image">
										<img alt="Man Beside Woman Billboard" src="https://images.pexels.com/photos/1031700/pexels-photo-1031700.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
									</div>
									<div className="card-content">
										<span className="card-title">
											<b>Advertising Campaigns</b>
										</span>
										<p>Got a marketing campaign that isn't as effective as you'd like, or looking to start a campaign in a way that will maximize your return while minimizing your expenses?
											We'll work with you to help you craft more effective campaigns that will directly target your main demographic, increasing your campaign effectiveness!
										</p>
									</div>
								</div>
							</div>
							<div className="col s12 m4 l4">
								<div className="card">
									<div className="card-image">
										<img alt="Assorted-color Plastic Gear Lot" src="https://images.pexels.com/photos/1476320/pexels-photo-1476320.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
									</div>
									<div className="card-content">
										<span className="card-title">
											<b>Automation</b>
										</span>
										<p>Spending too much time or money on an area of your business that involves repetitive tasks? Chances are we can find a way to automate it for you using 
											state of the art machine learning and deep learning algorithms saving you time and money in the long run.
										</p>
									</div>
								</div>
							</div>
						</div>
						<p style={{fontSize: 18}}>
							And that’s just the beginning. If you’re interested in what we can do for your business, 
							or have a project in mind that requires data, then <b>
								<Link href="/#Inquire">
									<a onClick={() => { 
										sendEvent({ category: 'Interest', action: 'Showed interest in inquiring', label: '/#Service' });
									}
									}>
										inquire about a consult	
									</a>
								</Link>
							</b> with us below and let’s get started!
						</p>
					</div>
				</span>
			</div>
		</div>
	)
}
