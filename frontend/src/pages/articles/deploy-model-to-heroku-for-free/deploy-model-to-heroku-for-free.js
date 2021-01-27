import Gist from 'react-gist';
import style from '../article-style';

import add_remote from './add_remote.png';
import create_app from './create_app.png';
import git_add from './git_add.png';
import git_commit from './git_commit.png';
import git_init from './git_init.png';
import git_push from './git_push.png';
import heroku_login from './heroku_login.png';
import dyno_edit from './dyno_edit.png';
import enable_dyno from './enable_dyno.png';
import new_request from './new_request.png';
import request_details from './request_details.png';
import set_query from './set_query.png';
import returned_labels from './returned_labels.png';

const DeployModelHeroku = () => {
    return (
        <div class="container">
            <img class="responsive-img center" alt="Clouds on Sky" src="https://images.pexels.com/photos/2232917/pexels-photo-2232917.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
            <p class="flow-text" style={style}>
                <b>Introduction</b>
                <br />
                <br />
                So you've just finished building an awesome machine learning model, but now you've just got one problem. How are you going to show it off to other people so they can 
                see what a genius you are? This is a problem that many data scientists face, but don't worry because this article will demonstrate 
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
                To start off with we're going to set up the Flask web server. For this tutorial I will be deploying a simple machine learning model that classifies whether a fruit 
                is an apple or an orange based on it's weight in grams and whether it's smooth or bumpy (0 for smooth, 1 for bumpy). The tutorial for this model can be
                found <a href="https://youtu.be/cKxRvEZd3Mw?list=PLOU2XLYxmsIIuiBfYad6rFYQU_jL2ryal" target="_blank" rel="noreferrer">here</a>. I have saved this model as a pickle file 
                named <i>model.p</i> that I have placed inside of my deployment directory.
                <br />
                <br />
                To create the web server, first I'll create a new file in my deployment directory called <i>server.py</i>. I'll then initialize the Flask app within the file and enable CORS. Next I'll 
                load my model in using Pickle.
                <br />
                <br />
                Next I'll create the route which will be responsible for predicting the labels of the features it is sent. This route will take in an array of feature vectors, 
                from the <i>features</i> parameter sent  a POST request, and will then predict the labels for each feature vector and return them in the <i>predicted_labels</i> parameter of 
                the returned JSON body.
                <br />
                <br />
                To do this I'll use the <i>app.route</i> decorator with the URL set to <i>/predict</i>, the allowed methods set as POST requests only, and strict slashes set 
                to false. Next I'll define the function that will be called whenever a POST request is sent to this route. This function will get the <i>features</i> parameter from 
                the body of the POST request form, and will use the model to predict the labels of these feature vectors. We will then convert the labels to a list of integers, 
                before returning the labels under the <i>predicted_labels</i> parameter of the JSON form the server will return. We will then start the web server by calling <i>app.run()</i> if 
                we are running the server file directly. The full code for the <i>server.py</i> file can be found below.
                <br />
                <br />
                <Gist id="85ff92ffa4d36dfd981ee568c6da53f5" />
                <br />
                <br />
                Next we have to create a Procfile inside of our deployment folder. A Procfile contains the code that Heroku will use to start our <i>server.py</i> file. The code for the Procfile can be found below.
                Note: Make sure you name the Procfile <i>Procfile</i> EXACTLY, with no file extensions, and a capital P.
                <br />
                <br />
                <Gist id="581fee5d94d43beaf9d32379c9b5cda0" />
                <br />
                <br />
                Finally we have to define the Python packages required for our server to run. To do this, we create a new file called <i>requirements.txt</i> inside of the deployment folder that 
                contains the package name and version of each package used in the project connected by a <i>==</i> on consecutive lines. The <i>requirements.txt</i> for my project
                can be found below as an example. <b style={{fontWeight: 500}}>Make sure you include Gunicorn in your list of requirements or else your server will not start.</b>
                <br />
                <br />
                <Gist id="78023ef9778e63de6754cb79b690f84f" />
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
                <img alt="Create a new app on Heroku" src={create_app} />
                <br />
                <br />
                Now that your new app has been created, open up the command prompt and navigate to your deployment folder. Now enter the command <i>heroku login</i>, then follow the instructions.
                <br />
                <br />
                <img alt="Login to Heroku with the Heroku CLI" src={heroku_login} />
                <br />
                <br />
                Now that you've logged in, you're ready to push your project to Heroku. Navigate to your deployment folder, then enter the command <i>git init</i>. This will initialize the repository.
                <br />
                <br />
                <img alt="Initialize Git within the deployment folder" src={git_init} />
                <br />
                <br />
                Now while still in your deployment folder enter the command <i>heroku git:remote -a your-project-name</i> where <i>your-project-name</i> is  the name you gave your Heroku app.
                <br />
                <br />
                <img alt="Add Heroku as a remote repository" src={add_remote} />
                <br />
                <br />
                While still inside the deployment folder, run the following three commands: <i>git add .</i>, <i>git commit -am "Initial commit"</i>, and <i>git push heroku master</i>. This 
                part might take a few minutes.
                <br />
                <br />
                <img alt="Add the files to be pushed to Heroku" src={git_add} /> 
                <br />
                <br />
                <img alt="Commit the files to be pushed to Heroku" src={git_commit} />
                <br />
                <br />
                <img alt="Push the files to Heroku" src={git_push} />
                <br />
                <br />
                In some cases, you may manually need to enable the dyno. To do this, navigate to the resources tab on your Heroku apps dashboard and look for the edit button.
                <br />
                <br />
                <img alt="Navigate to the Heroku dyno settings for the app" src={dyno_edit} />
                <br />
                <br />
                Now enable the dyno by clicking the edit button, setting the slider to the right, then pressing confirm.
                <br />
                <br />
                <img alt="Enable the dyno in the Heroku settings" src={enable_dyno} />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Testing the deployed model</b>
                <br />
                <br />
                So now it's time to test out the model. The URL to your app will be <i>https://your-app-name.herokuapp.com</i>, where <i>your-app-name</i> is whatever name you gave your Heroku app.
                To test out the URL, I'm going to use an app <a href="https://insomnia.rest/" target="_blank" rel="noreferrer">Insomnia</a>, which will allow us to send POST requests 
                to our deployed model. Download and install Insomnia to your computer following the steps on the page.
                <br />
                <br />
                Now that Insomnia has been installed, open it up and create a new request.
                <br />
                <br />
                <img alt="Create a new Insomnia request" src={new_request} />
                <br />
                <br />
                Give the request a name, set the request type to POST and set the request to use JSON. Then click create.
                <br />
                <br />
                <img alt="Set the parameters for the request" src={request_details} />
                <br />
                <br />
                Set the URL to the URL of your deployed model, and create a JSON body containing the features you wish for your model to predict the labels of under the <i>features</i> parameter,
                then click send.
                <br />
                <br />
                <img alt="Set the query to be sent to the deployed model" src={set_query} />
                <br />
                <br />
                Now if you have done everything correctly you should see that the model has sent back the predicted labels for the features under the <i>predicted_labels</i> parameter. 
                In this case it has predicted the first set of features as an apple, and the remaining two sets of features as oranges. Success!
                <br />
                <br />
                <img alt="The response of the returned labels from the deployed model" src={returned_labels} />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Outroduction</b>
                <br />
                <br />
                So now you know how to deploy your models to Heroku. One thing to note is that Heroku has a limit to the size of the files you can upload, so you may have to use 
                another service if you're trying to upload an extremely large model or project, but other than that Heroku is a great free choice for deploying your models. 
                So now with this knowledge, go and deploy your apps to the world and show off your genius!
            </p>
        </div>
    );
};

export default DeployModelHeroku;