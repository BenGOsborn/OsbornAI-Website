---
title: Deploy A Model To Heroku For Free
description: This article demonstrates how you can deploy your machine learning models to the cloud for free using Heroku and Flask.
author: OsbornAI
date_published: 26/01/2021
keywords: sklearn, scikit-learn, heroku, model, free, flask, python, deploy, gunicorn
---

![Clouds on Sky](https://images.pexels.com/photos/2232917/pexels-photo-2232917.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:

So you've just finished building an awesome machine learning model, but now you've just got one problem. How are you going to show it off to other people so they can see what a genius you are? This is a problem that many data scientists face, but don't worry because this article will demonstrate how you can deploy your model to the cloud so you can show it off to the world!

<br />

To do this we're going to be using a free cloud computing service called Heroku. Heroku initially charges nothing and doesn't require a credit card to get started, making it hassle free to start deploying your models to the cloud. The only drawback with the free version of Heroku is that it can be a little slow, however if you're at the point where yoou're getting enough users for the speed to be a concern, you can upgrade your plan to fit your needs.

<br />

As well as using Heroku, we're going to be using Flask to build the web app. Flask provides us with a simle and light framework that allows us to build web servers fast and easily.

<br />

### Getting started with Heroku:
The first you must do is create a free Heroku account. You can do this by going to [this link](https://signup.heroku.com/) and following the steps.

<br />

Once you have created your Heroku account, download and install the Heroku CLI (Command Line Interaface), which you can do by navigating to [this link](https://devcenter.heroku.com/articles/heroku-cli) and following the instructions.

<br />

Now you're going to have to install Git. If you already have Git installed you may skip to the next section. If not, then download and install Git by navigating to [this link](https://git-scm.com/downloads) and following the instructions.

<br />

### Setting up the web app and model for deployment:
To start off with we're going to set up the Flask web server. For this tutorial I will be deploying a simple machine learning model that classifies whether a fruit is an apple or an orange (0 for an apple, 1 for an orange) based on it's weight in grams and whether it's smooth or bumpy (0 for smooth, 1 for bumpy). The tutorial for this model can be found [here](https://youtu.be/cKxRvEZd3Mw?list=PLOU2XLYxmsIIuiBfYad6rFYQU_jL2ryal). I have saved this model as a pickle file named <i>model.p</i> that I have placed inside of my <i>deployment</i> directory.

<br />

To create the web server, first I'll create a new file in my deployment <i>directory</i> called <i>server.py</i>. I'll then initialize the Flask app within the file and enable CORS. Next I'll load my model in using Pickle.

<br />

Next I'll create the route which will be responsible for predicting the labels of the features it is sent. This route will take in an array of <code>feature</code> vectors, from the features parameter sent a POST request, and will then predict the labels for each feature vector and return them in the <code>predicted_labels</code> parameter of the returned JSON body.

<br />

To do this I'll use the app.route decorator with the URL set to <code>/predict</code>, the allowed methods set as POST requests only, and strict slashes set to false. Next I'll define the function that will be called whenever a POST request is sent to this route. This function will get the <code>features</code> parameter from the body of the POST request form, and will use the model to predict the labels of these feature vectors. We will then convert the labels to a list of integers, before returning the labels under the <code>predicted_labels</code> parameter of the JSON form the server will return. We will then start the web server by calling <code>app.run()</code> if we are running the server file directly. All of the code for <i>server.py</i> can be found below.

<br />

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__) # Initialize the flask app
CORS(app) # Enable CORS

app.config['MODEL'] = pickle.load(open('model.p', 'rb')) # Load in the model from a pickle file

@app.route('/predict', methods=['POST'], strict_slashes=False) # The route that will predict the labels of the features sent via a POST request, and has strict slashes set to false
def predict(): # The code that will be executed when a POST request is sent to this route
    form = request.json # Get the JSON body of the form

    features = form['features'] # Extract the features from the JSON form
    predicted_labels = app.config['MODEL'].predict(features) # Make a prediction of the labels for the features
    predicted_labels_converted = [int(label) for label in predicted_labels] # Convert predicted labels type to regular integers and a list object

    return jsonify({'predicted_labels': predicted_labels_converted}) # Return the predicted labels

if __name__ == '__main__': # If this file is run directly
    app.run() # Run the app
```

<br />

Next we have to create a Procfile inside of our <i>deployment</i> folder. A Procfile contains the code that Heroku will use to start our <i>server.py file. The code for the Procfile can be found below. Note: Make sure you name the Procfile <i>Procfile</i> EXACTLY, with no file extensions, and a capital P. All of the code for the Procfile can be found below.

```python
web: gunicorn server:app
```

<br />

Finally we have to define the Python packages required for our server to run. To do this, we create a new file called <i>requirements.txt</i> inside of the deployment folder that contains the package name and version of each package used in the project connected by a <code>==</code> on consecutive lines. The <i>requirements.txt</i> for my project can be found below as an example. <b>Make sure you include <code>gunicorn</code> in your list of requirements or else your server will not work properly when deployed</b>.

<br />

```python
Flask==1.1.1
gunicorn==20.0.4
Flask-Cors==3.0.10
scikit-learn==0.21.3
```

<br />

### Deploying the web app and model to Heroku:
Now that the project is set up to be deployed, it's time to deploy the model. To start off with go to your Heroku dashboard and [create a new app](https://dashboard.heroku.com/new-app). You can give the app whatever name you want as long as it hasn't been taken yet, and you can choose the location where your server will be hosted. An example can be found below.

<br />

![Create a new app](https://i.imgur.com/U2KaiPZ.png)

<br />

Now navigate to the settings tab on your Heroku app's dashboard and go to buildpacks. 

<br />

![Find the add buildpack option on Heroku](https://i.imgur.com/2wmXeSt.png)

<br />

Click on the add buildpack button, and then select the Python buildpack. Then press save.

<br />

![Add the Python buildpack](https://i.imgur.com/qvMB6jR.png)

<br />

Now open up the command prompt and navigate to your <i>deployment</i> folder. Now enter the command <code>heroku login</code>, then follow the instructions.

<br />

![Heroku login](https://i.imgur.com/wiHC199.png)

<br />

Now that you've logged in, you're ready to push your project to Heroku. While still in the <i>deployment</i> folder, then enter the command <code>git init</code>. This will initialize the repository.

<br />

![Git init](https://i.imgur.com/AqfuPGI.png)

<br />

Now while still in your <i>deployment</i> folder enter the command <code>heroku git:remote -a your-project-name</code> where <code>your-project-name</code> is the name you gave your Heroku app.

<br />

![Add Git remote repository](https://i.imgur.com/uzVbiY9.png)

<br />

While still inside the <i>deployment</i> folder, run the following commands: <code>git add .</code>, <code>git commit -am "Initial commit"</code>, and <code>git push heroku master</code>. This part might take a few minutes.

<br />

![Git add](https://i.imgur.com/syrc2W1.png)

<br />

![Git commit](https://i.imgur.com/Vl4Bj0j.png)

<br />

![Git push](https://i.imgur.com/hZIWRTM.png)

<br />

In some cases, you may manually need to enable the dyno. To do this, navigate to the resources tab on your Heroku app's dashboard and look for the edit button.

<br />

![Prepare to manually enable Heroku dyno](https://i.imgur.com/jiL5lOD.png)

<br />

Now enable the dyno by clicking the edit button, setting the slider to the right, then pressing confirm.

<br />

![Manually enable Heroku dyno](https://i.imgur.com/SpKn6aj.png)

<br />

So now it's time to test out the model. The URL to your app will be [https://your-app-name.herokuapp.com](https://your-app-name.herokuapp.com), where <i>your-app-name</i> is whatever name you gave your Heroku app. To test out the URL, I'm going to use an app [Insomnia](https://insomnia.rest/), which will allow us to send POST requests to our deployed model. Download and install Insomnia to your computer following the steps on the page.

<br />

Now that Insomnia has been installed, open it up and create a new request.

<br />

![Create a new Insomnia request](https://i.imgur.com/uo0shk1.png)

<br />

Give the request a name, set the request type to POST and set the request to use JSON. Then click create.

<br />

![Name the new Insomnia request](https://i.imgur.com/JEiPzdH.png)

<br />

Set the URL to the URL of your deployed model, and create a JSON body containing the features you wish for your model to predict the labels of under the <code>features</code> parameter, then click send.

<br />

![Features to be sent to the deployed model](https://i.imgur.com/jLQosbB.png)

<br />

Now if you have done everything correctly you should see that the model has sent back the predicted labels for the features under the <code>predicted_labels</code> parameter. In this case it has predicted the first set of features as an apple, and the remaining two sets of features as oranges as expected. Success!

<br />

![Returned labels from the deployed model](https://i.imgur.com/fa9qJKw.png)

<br />

### Outroduction:
So now you know how to deploy your models to Heroku. One thing to note is that Heroku has a limit to the size of the files you can upload, so you may have to use another service if you're trying to upload an extremely large model or project, but other than that Heroku is a great free choice for deploying your models. So now with this knowledge, go and deploy your apps to the world and show off your genius!