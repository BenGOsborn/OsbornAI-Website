import Gist from 'react-gist';
import style from '../article-style';
import one from './one.png';
import two from './two.png';
import three from './three.png';
import four from './four.png';
import five from './five.png';
import six from './six.png';
import seven from './seven.png';

const DeployModelHeroku = () => {
    return (
        <div class="container">
            <img class="responsive-img center" alt="Clouds on Sky" src="https://images.pexels.com/photos/2232917/pexels-photo-2232917.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
            <p class="flow-text" style={style}>
                <b>Introduction</b>
                <br />
                <br />
                So you've just finished building an awesome machine learning model, but now you've just got one problem. How are you going to show it off to other people so they can 
                see what a genius you are? This is a problem that faces many data scientists, but don't worry because it's a super easy fix, and this article will demonstrate 
                how you can deploy your model to the cloud so you can show it off to the world!
                <br />
                <br />
                To do this we're going to be using a free cloud computing service called Heroku. Heroku initially charges nothing and doesn't require a credit card to get started, making 
                it hassle free to start deploying your models to the cloud. The only drawback with the free version of Heroku is that it can be a little slow, however if you're at the point 
                where yoou're getting enough users for the speed to be a concern, you can upgrade your plan to fit your needs.
                <br />
                <br />
                As well as using Heroku, we're going to be using Flask to build the web app. Flask provides us with a simle and light framework that allows us to build web 
                servers fast and easily.
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Getting started with Heroku</b>
                <br />
                <br />
                The first you must do is create a free Heroku account. You can do this by going to <a href="https://signup.heroku.com/" target="_blank" rel="noreferrer">this link</a> and 
                following the steps.
                <br />
                <br />
                Once you have created your Heroku account, download and install the Heroku CLI (Command Line Interaface), which you can do by navigating to <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noreferrer">this link</a> and 
                following the instructions.
                <br />
                <br />
                Now you're going to have to install Git. If you already have Git installed you may skip to the next section. If not, then download and install Git by navigating to <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer">this link</a> and
                following the instructions.
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Setting up the web app for deployment</b>
                <br />
                <br />
                To start off with we're going to set up the Flask web server. For this tutorial, I will deploy the RNN text generation model built in a previous article which 
                can be found <a href="https://osbornai.com/#/articles/text-generation-using-a-rnn" target="_blank" rel="noreferrer">here</a>. To start off with I've created a new 
                file in my deployment folder called <i>model.py</i>, which contains a pipeline that takes in an input sequence and outputs the sequence with the generated characters 
                on the end of it using the <i>model.h5</i> RNN text generation model contained within the deployment folder. The following code demonstrates this pipeline. 
                I should also note that unless you are using the same model as me, you will have to use your own pipeline for your model.
                <br />
                <br />
                <Gist id="cd9fe1b2f3f532d8cd1c15b7727831c7" />
                <br />
                <br />
                Now that we have created a pipeline for the model, let's create the web server using Flask. I'll make a new file in my deployment folder called <i>server.py</i> which 
                is where all of my server code will go. First off I'll initialize my Flask app, and then initialize the model pipeline that I have imported from <i>model.py</i>. 
                <br />
                <br />
                Next I define the main route for the server, at <i>/predict_text</i> using the <i>route</i> decorator. I have made it so that only POST requests 
                can be sent to this route with the <i>methods</i> argument, and have disabled strict slashes with the <i>strict_slashes</i> argument. The decorated function <i>generateText</i> is the
                function that will be called whenever a POST request is sent to that route. 
                <br />
                <br />
                My <i>/predict_text</i> route will take in the seed text from the request body, pass it through the pipeline and return the sequence and predicted characters. 
                To do this I get the JSON body from the request form using <i>request.json</i>, and extracting the <i>seed_text</i> value 
                from the form by accessing the form like a dictionary. I then pass the <i>seed_text</i> through my pipeline, and then return a JSON form which contains the predictions made by the model 
                in the <i>predictions</i> paramter of the form. 
                <br /> 
                <br /> 
                If there is an error during this process, then the model will return <i>None</i> for the predictions value as well as the error encountered.
                Finally we will call the <i>app.run()</i> method if we are running this file directly. The code for the server can be found below.
                <br />
                <br />
                <Gist id="9360c5cbc01fdb1f958a49a40543bb40" />
                <br />
                <br />
                Next we have to create a Procfile inside of our deployment folder. A Procfile contains the code that Heroku will use to start our <i>server.py</i> file. The code for the Procfile can be found below.
                Note: Make sure you name the Procfile <i>Procfile</i> EXACTLY, with no file extensions, and a capital P.
                <br />
                <br />
                <Gist id="581fee5d94d43beaf9d32379c9b5cda0" />
                <br />
                <br />
                Finally we have to define the Python packages required for our server to run. To do this, we create a new file called <i>requirements.txt</i> that contains the 
                package name and version of each package used in the project connected by a <i>==</i> on consecutive lines. The <i>requirements.txt</i> for my project can be found below as an example.
                <br />
                <br />
                <Gist id="92f245fc97ce4fa494e298dd3d9721f7" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Deploying the model to Heroku</b>
                <br />
                <br />
                Now that the project is set up to be deployed, it's time to deploy the model. To start off with go to your Heroku dashboard and <a href="https://dashboard.heroku.com/new-app" target="_blank" rel="noreferrer">create a new app</a>.
                You can give the app whatever name you want as long as it hasn't been taken yet, and you can choose the location where your server will be hosted. An example can be found below.
                <br />
                <br />
                <img alt="Create a new app on Heroku" src={one} />
                <br />
                <br />
                Now that your new app has been created, open up the command prompt and navigate to your deployment folder. Now enter the command <i>heroku login</i>, then follow the instructions.
                <br />
                <br />
                <img alt="Login to Heroku with the Heroku CLI" src={two} />
                <br />
                <br />
                Now that you've logged in, you're ready to push your project to Heroku. Navigate to your deployment folder, then enter the command <i>git init</i>. This will initialize the repository.
                <br />
                <br />
                <img alt="Initialize Git within the deployment folder" src={three} />
                <br />
                <br />
                Now while still in your deployment folder enter the command <i>heroku git:remote -a your-project-name</i> where <i>your-project-name</i> is  the name you gave your Heroku app.
                <br />
                <br />
                <img alt="Add Heroku as a remote repository" src={four} />
                <br />
                <br />
                Now run the following three commands: <i>git add .</i>, <i>git commit -am "Initial commit"</i>, and <i>git push heroku master</i>. This part might take a few minutes.
                <br />
                <br />
                <img alt="Add the files to be pushed to Heroku" src={five} /> 
                <br />
                <br />
                <img alt="Commit the files to be pushed to Heroku" src={six} />
                <br />
                <br />
                <img alt="Push the files to Heroku" src={seven} />
            </p>
        </div>
    );
};

export default DeployModelHeroku;