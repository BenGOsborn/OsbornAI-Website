---
title: How to containerize machine learning models using Docker
description: This article demonstrates how to containerize any of your machine learning or deep learning model using Docker.
author: OsbornAI
author_social: https://twitter.com/BenOsbornAI
date_published: 20/02/2021 
keywords: docker, containerizing, tensorflow, machine learning, how to containerize a machine learning model, how to, deployment, environment, deep learning, consistent
---

![Aerial View Photography of Container Van Lot](https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:
Who would of thought that being able to bundle up your model into an environment that can be run on any computer without need for excess installations would be so useful? But surely that sounds way too good to be true, right? Wrong! Containerizing applications has become extremely popular within recent years, with no exception to the big data, machine learning and deep learning industry, which take advantage of this new technology to its fullest potential. 

<br />

In this article you're going to learn what is containerization and why you should use it, what Docker is, and be provided with an example of how you can containerize a TensorFlow and Flask REST API using Docker.

<br />

### What is containerization and why it is useful:
As stated earlier, containerization is essentially the process of bundling together a project and its environment into virtual runtime environments which can then be deployed wherever and will run exactly according to how the environment was set up. 

<br />

A container is essentially a miniature virtual server that contains all of the tools required to run your code. Ok, but why is that useful? Containers provide a simple way of sharing code with others without the need for them to set up their environment to run that code. This means that your code can now be run on almost any computer in the world that is able to run that container without the need for excess set up. 

<br />

Lets say that I'm working on a machine learning model for a client using Python 3.8 and TensorFlow 2.0. I finish the application, and I explain to my client that the application is finished and ready for them to deploy. You send them your code, and tell them to install Python 3.8 and TensorFlow 2.0, which they say they already have installed. Two hours later you get a phone call saying that their team has been encountering an error when trying to run your code. You spend the next four hours working with them, before finding out that they were actually using Python 3.6, which did not support some features that the intended version of Python 3.8 did. You've fixed the problem, but now this mistake has wasted both parties time, given you a large headache and worst of all has damaged your reputation. If only there was something you could of done to prevent this...

<br />

Now let's say you created a container that contained the code for the model with the correct versions and requirements of Python and TensorFlow already installed. You give the container to your client, they run it and it works first time without wasting your time, causing you frustration, and damaging your reputation!

<br />

### What is Docker:
Docker is a platform that allows you to build, run and share containers to make containerizing your applications a straightforward process. In Docker, you containerize your applications by building a Docker image. A Docker image usually consists of first declaring a base image to build upon, which is usually a base Operating System (Typically Linux) for you to run your code on. After that, you declare what files to include in the image, as well as any dependencies the project might need, and then how the container should go about executing your code. Once a container has been built, it can be run, which will start your application. You can also share your image around, allowing other people to run your code without needing to mess around installing dependencies.

<br />

### How to containerize an application using Docker:
Now that we know what containerization is and why we should use it, and have an understanding of Docker, let's containerize a TensorFlow and Flask REST API using Docker.

<br />

#### Building the model
First, let's create a basic TensorFlow model. This model will be trained on the Iris dataset and will be be able to determine which category of flower each set of features belongs to (Setosa, Versicolor, Virginica).

<br />

First we'll import our dependencies for this file, then declare our current working directory and set the random seed for NumPy and TensorFlow. Next we'll load the features and labels from the Iris dataset. We'll then concatenate our features and labels so that we can shuffle our data and keep them paired together. We will then split our data into a training and validation set. 80% of the data for our training set, and the remaining 20% will make up the validation set. The code for this section can be found below.

<br />

```python
import tensorflow as tf
import numpy as np
import pickle
from sklearn.datasets import load_iris
import os

BASE_PATH = os.getcwd() # Set the current directory
SEED = 1234 # Set the random seed for reproducability

np.random.seed(SEED) # Set the numpy seed
tf.random.set_seed(SEED) # Set the tensorflow seed

X, Y = load_iris(return_X_y=True) # Load the features and labels from the iris dataset

data = np.concatenate((X, Y.reshape(-1, 1)), axis=1) # Concatenate the labels to the features
np.random.shuffle(data) # Shuffle the new data

split_size = int(0.8 * Y.size) # Specify the size of training pairs (80% of the data)
X_train = data[:split_size, :4] # Create the training features
Y_train = data[:split_size, 4:] # Create the training labels
X_valid = data[split_size:, :4] # Create the validation features
Y_valid = data[split_size:, 4:] # Create the validation labels
```

<br />

Now we will standardize our data to increase the performance of the model. We will do this by getting the mean and standard deviation of our TRAINING SET ONLY. It is important that you do not take into consideration the validation data when calculating the mean and standard deviation, or you will end up with data leakage. Next we will save our calculated mean and standard deviation to a pickle file, as we will use these calculated values when making the predictions for our features. We will then standardize both our training and validation sets. The code for this section can be found below.

<br />

```python
train_mean = X_train.mean(axis=0) # Get the mean of the training features
train_std = X_train.std(axis=0) # Get the standard deviation of the training features

standardize = {'mean': train_mean, 'std': train_std} # Create a dictionary to store the mean and standard deviation of the training features to be used with the model
pickle.dump(standardize, open(os.path.join(BASE_PATH, 'standardize.p'), 'wb')) # Save the dictionary containing the standardizing parameters to a pickle file

X_train = (X_train - train_mean) / train_std # Standardize the training features
X_valid = (X_valid - train_mean) / train_std # Standardize the validation features
```

<br />

Now we will build the model. We will use a Keras sequential model that contains:
 - A dense layer with a ReLU activation function with an output size of 24
 - A dropout layer with a dropout rate of 0.4 (40%)
 - A batch normalization layer
 - A dense layer with a Softmax activation function with an output size of 3 (the number of classes of flowers)

We will then compile this model using an Adam optimizer with a learning rate of 1e-3, a loss function of sparse categorical crossentropy. We will also tell the model to track the accuracy metric during training. We will then fit this data to the training data and validate on the validation data over 64 epochs with a batch size of 64, before saving our model. The code for this section can be found below.

<br />

```python
model = tf.keras.models.Sequential([ # Create the model that will predict the type of flower basedon the features
    tf.keras.layers.Dense(24, activation='relu'),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dense(3, activation='softmax')
])
model.compile(optimizer=tf.keras.optimizers.Adam(1e-3), loss=tf.keras.losses.SparseCategoricalCrossentropy(), metrics=['accuracy']) # Compile the model with sparse categorical crossentropy loss, adam optimizer and to track the accuracy of the network

model.fit(X_train, Y_train, batch_size=64, epochs=64, validation_data=(X_valid, Y_valid)) # Fit the model on the training data and validate on the validation data with a batch size of 64 and 64 epochs

model.save(os.path.join(BASE_PATH, 'model.h5')) # Save the model
```

<br />

#### Creating the API
Now we will create the API that will predict the category of flower that the features sent belong to.

<br />

First of all we will import the dependencies for the project, and will define the class that will be responsible for predicting the cateogory of flower that the features belong to. We will call this class <code>Model</code> and will give it a constructor that will initialize the current working directory, load in our standardization parameters and set them as class members, load in the model and set is as a class member, and declare the mapping from the index of the category with the highest probability output by the model to the name of the flower that that index corresponds to and set is as a class member.

<br />

Then we will create a class method <code>predict_labels</code> that will take in a set of features and determine what category of flowers those features correspond to. We will first standardize the input features using our standardizing mean and standard deviation, and will then make predictions of the labels of these standardized flower features using our model. We will then determine the indices with the highest probabilies for each set of outputs from the model (depending on the number of features fed to the model), which will then be converted to the corresponding name of the flower category. These labels will then be returned. The code for this section can be found below.

<br />

```python
import numpy as np
import pickle
import tensorflow as tf
from flask import Flask, request, jsonify
import os

class Model: # Create the class that will be used for predicting the class of a flower given its features
    def __init__(self): # Define a constructor
        base_path = os.getcwd() # Initialize the current directory

        self.standardize = pickle.load(open(os.path.join(base_path, 'standardize.p'), 'rb')) # Load the standardization data from the pickle file
        self.model = tf.keras.models.load_model(os.path.join(base_path, 'model.h5')) # Load the model

        self.labels = {0: 'Setosa', 1: 'Versicolor', 2: 'Virginica'} # Define the labels for the outputs of the model
    
    def predict_labels(self, features): # Create the function that will predict the labels given the inoput features
        processed_features = (np.array(features) - self.standardize['mean']) / self.standardize['std'] # Standardize the features
        predictions = self.model.predict(processed_features) # Predict the labels for the standardized features
        predictions_argmax = np.argmax(predictions, axis=1).astype(int) # Choose the highest probability label as the predicted label

        labels = [self.labels[pred] for pred in predictions_argmax] # Convert the output indeces from the network to the flowers corresponding label

        return labels # Return the labels
```

<br />

Now we're going to use Flask to create the API that will serve the <code>Model</code> class we just created.

<br />

First of all initialize the Flask <code>app</code>m and then initialize our <code>Model</code> class and store it inside of the <code>app.config</code>. Now we will create the <i>/predict</i> route which will receive a set of features in the form of a POST request and will return the cateogry of flower of which each set of features belongs to. To do this we will define a route with the URL <i>/predict</i> that will only accept POST requests and will have strict slashes set to false.

<br />

We will then define the function <code>predict</code> that will be called whenever a POST request is sent to this route. We will first get the JSON body from the request, and will then extract the features from the JSON body. We will then use our <code>Model</code> class to predict the category of flower that each set of features corresponds to, before returning these predictions in JSON.

<br />

Finally we will call our <code>app</code>. To do this we will specify that if we run this file directly, indicated by <code>__name__ == '__main__'</code> returning true, then we will run our <code>app</code>. The code for this section can be found below.

<br>

```python
app = Flask(__name__) # Initialize flask

app.config['MODEL'] = Model() # Initialize the model class

@app.route('/predict', methods=['POST'], strict_slashes=False) # Create the route that will recieve a POST request containing the features of flowers to have their labels predicted
def predict(): # Define the function that will be called when a post request is sent to this route
    form = request.json # Get the json data from the request

    features = form['features'] # Extract the features from the json body
    predicted_labels = app.config['MODEL'].predict_labels(features) # Predict the labels of the features

    return jsonify({'predicted_labels': predicted_labels}) # Return the predicted labels

if __name__ == '__main__': # If this file is run directly
    app.run() # Run the app
```

<br />