---
title: Deep Fake Face Swap Autoencoder
description: This article demonstrates how an autoencoder can be used to create a deep fake that swaps the faces of an individual with another.
author: OsbornAI
author_social: https://twitter.com/BenOsbornAI
date_published: 11/01/2021 
keywords: autoencoder, face swap, deep fake, tensorflow, keras, tutorial, tensorflow, python, deepfake
---

![Selective Focus Photography of Person Wearing Mask](https://images.pexels.com/photos/1362371/pexels-photo-1362371.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:
This article well demonstrate how you can build an autoencoder that can swap the face featured in an image with another. To do this we'll use a a deep convolutional autoencoder that we will build using TensorFlow and Keras. This tutorial is for educational purposes only, I DO NOT condone any misuse of this technology and I am NOT RESPONSIBLE for anything you do with it.

<br />

The code for this tutorial, as well as the trained model can be found on my GitHub page [here](https://github.com/OsbornAI/Deep-Fake-Face-Swap-Autoencoder).

<br />

To start off with you're going to need a dataset which contains the faces of the person you want to swap the face of and the persons face you want to swap the face with. For this tutorial, I will be swapping Donald Trump's face with Keanu Reeves's. I have created a dataset containing around 4000 images of each celebrities face sourced from Google Images. All the images I have sourced fall under the Creative Commons License, so I will not be releasing this dataset as I do not own the rights to these images, however in an upcoming article I will be demonstrating how you can create a dataset like this one for yourself, so make sure to stick around!

### Loading and preprocessing the images:
Before we load in our images, we have to process them first. To do this we'll create a function which will load all of the images in a directory, convert them to RGB, resize them to be 64x64, and then store them in a list for further use. We will then normalize the values of the pixels that make up each images to be between 0 and 1 by diving them by 255.

<br />

```python
import os
import numpy as np
import cv2

def loadImages(image_dir): # Load in the images from a specified directory, preprocess them and store them in a list
    dir_items = os.listdir(image_dir) # List the images in the directory
    np.random.shuffle(dir_items) # Shuffle the images in the directory

    return_list = [] # Create the list where the images will be stored

    for file in dir_items: # Iterate over all of the images
        try: # If there are no errors
            image_loc = os.path.join(image_dir, file) # Create the full path to where the image is located

            img = cv2.imread(image_loc) # Read the image
            img_color = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) # Convert the image from BGR to RGB
            img_resize = cv2.resize(img_color, (64, 64), interpolation=cv2.INTER_AREA) # Reshape the image to be 64x64
            return_list.append(img_resize) # Store the image in the return list

        except Exception as e: # If there is an error
            print(f"Encountered exception '{e}' for file '{file}'.") # Print out the error and the file in which the error occured
        
    return np.array(return_list) / 255 # Convert the stored images to a numpy array and then normalize the pixels by dividing the value of each pixel by 255 so each pixel has a value between 0 and 1
```

<br />

### Split the data:
Now we'll go and write a function which will split our image dataset into a training set and a validation set. We'll do this by calculating the size of 90% of our data, then we'll say all the image data up to that point will become our training set, and the remaining data will be our validation set.

<br />

```python

def splitData(images): # Allocate 90% of the image data to be used in the training set, and the remaining 10% of the image data to be used in the validation/test set
    split_len = int(0.9 * len(images))
    
    return images[:split_len], images[split_len:]
```

<br />

### Loading the data:
Now we'll go and load in our face data. First of all I will load in the Keanu Reeves's face images using the <code>loadImages</code> function, with the argument set to the directory that contains my Keanu Reeve's face images. I only want to load in 3000 of the images, so I'll specify that I only want the first 3000 items in the array. I'll then split this image data into a training set <code>keanu_train</code> and a validation set <code>keanu_valid</code> using the <code>splitData</code> function with the argument set as the raw <code>keanu</code> array.

<br />

Now we'll go and repeat the same thing, but this time with the Trump face images. We'll use our <code>loadImages</code> function and set it's argument to be the directory containing our Trump face images, and I'll specify that I only want to load in 3000 of these images. I'll then split this image data into a training set <code>trump_train</code> and a validation set <code>trump_valid</code> using the <code>splitData</code> function, with the argument set as the raw <code>trump</code> array.

<br />

```python
keanu_dir = ".\\data\\keanu" # Set this to the directory where your keanu reeves images are stored
keanu = loadImages(keanu_dir)[:3000] # Load the keanu images and specify that we only want to use the first 3000
keanu_train, keanu_valid = splitData(keanu) # Split the keanu reeves image data into a training set and a validation/test set

trump_dir = ".\\data\\trump" # Set this to the directory where your donald trump images are stored
trump = loadImages(trump_dir)[:3000] # Load the trump images and specify that we only want to use the first 3000
trump_train, trump_valid = splitData(trump) # Split the donald trump image data into a training set and a validation/test set
```

<br />

### Building the model:
Before we get started building the model, it's best if you understand how it works first. We create a single encoder, and two decoders. We train our encoder and one of our decoders to reconstruct the images of the first persons face, then we use the same encoder with a different decoder to reconstruct the images of the second persons face. The autoencoder then learns the features of a face which is represented in the bottleneck in the middle of the model (the smallest most compressed layer). The decoder then learns to reconstruct these features into an image resembling the person it was trained on. So when we want to test our model by swapping the faces, we will feed the images of one of the people into the encoder, then we will feed this encoded vector into the other persons decoder to perform the face swap. Now let's build the model.

<br />

We're going to be using a deep convolutional model. To start off we'll create a function which will build our encoder layer for us. This layer will consist of 10 2D convolutional layers with a ReLU activation function, same padding, and alternating step sizes (strides) of 1 and 2. These layers will reduce the dimensions of our image from 64x64x3 (the 3 comes from the fact the image is RGB and has 3 channels), to 2x2x8. We will then flatten this result, and feed it into two dense layers with a ReLU activation function. The final dense layer in our encoder model will represent the 24 encoded features that the model uses to represent the face.

<br />

Now we will create the function which will build our decoding layer. It will start off with a dense layer with a ReLU activation function which will scale our encoded features to have a size of 2x2x8, which was our original downsamping size. We will then reshape the outputs from our dense layer to be 2x2x8, and then we will apply a series of Conv2DTranspose layers with alternating step sizes (strides) of 1 and 2. Finally, we will apply one last Conv2D layer with a sigmoid activation function, same padding and a step size (stride) of 1. The outputs from this layer will have a shape of 64x64x3, the same as the original image of which we are trying to reconstruct.

<br />

Now we'll go ahead and define the model which will learn to reconstruct images of Keanu Reeves. First we will create our <code>encoder</code> layer which we will use in both models, then we will go and define a <code>keanu_input</code> input layer which gets fed into our <code>encoder</code> layer which then get's fed into a unique <code>keanu_decoded</code> decoding layer. We will then construct our <code>keanu_model</code> from these layers using the Keras functional API. We will then compile our model with a mean squared error loss function as this is a regression problem, and an ADAM optimizer. We will use a decaying learning rate with an initial learning rate of 1e-3, that will have a decay rate of 0.9, and will decay every 15000 training steps.

<br />

Now we'll do the same thing to create the model which will learn to reconstruct our Trump face images. We will create a <code>trump_input</code> input layer, which we will then feed into our shared <code>encoder</code> layer, which we will then feed into a unique <code>trump_decoded</code> decoding layer. We'll then go and create our <code>trump_model</code> using the Keras functional API, then we'll compile our model with a mean squared error loss function, and an ADAM optimizer. Once again we will use a decaying learning rate with an initial learning rateof 1e-3, that will have a decay rate of 0.9, and will decay every 15000 training steps.

<br />

```python
import tensorflow as tf
from tensorflow.keras import layers

def buildEncoder(): # Create a function to build the encoder model architecture
    encoder = tf.keras.models.Sequential([
        layers.Conv2D(128, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(128, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2D(64, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(64, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2D(32, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(32, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2D(16, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(16, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2D(8, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(8, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Flatten(),
        layers.Dense(2*2*8, activation='relu'),
        layers.Dense(24, activation='relu'),
    ])
    
    return encoder

def buildDecoder(): # Create a function to build the decoder model architecture
    decoder = tf.keras.models.Sequential([
        layers.Dense(2*2*8, activation='relu'),
        layers.Reshape((2, 2, 8)),
        layers.Conv2DTranspose(8, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2DTranspose(8, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2DTranspose(16, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2DTranspose(16, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2DTranspose(32, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2DTranspose(32, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2DTranspose(64, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2DTranspose(64, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2DTranspose(128, (4, 4), strides=2, activation='relu', padding='same'),
        layers.Conv2DTranspose(128, (4, 4), strides=1, activation='relu', padding='same'),
        layers.Conv2D(3, (3, 3), activation='sigmoid', padding='same')
    ])
    
    return decoder

encoder = buildEncoder() # Build the shared encoder model

# --------------------------------------------------------------------------------------------------

keanu_input = layers.Input(shape=keanu.shape[1:]) # Specify the shape of the inputs to the keanu model for the graph
keanu_encoded = encoder(keanu_input) # Feed the inputs into the shared encoder
keanu_decoded = buildDecoder()(keanu_encoded) # Feed the keanu encoded layer through a unique decoder layer

keanu_lr = tf.keras.optimizers.schedules.ExponentialDecay(initial_learning_rate=1e-3, decay_steps=15000, decay_rate=0.9) # Create learning rate decay with an initial learning rate of 1e-3 that has a decay rate of 0.9 and will decay every 15000 steps
keanu_model = tf.keras.models.Model(keanu_input, keanu_decoded) # Specify the inputs and outputs of the keanu model so tensorflow can build a computation graph
keanu_model.compile(loss=tf.keras.losses.MeanSquaredError(), optimizer=tf.keras.optimizers.Adam(learning_rate=keanu_lr)) # Compile the keanu model with a mean squared error loss function, and an adam optimizer using our keanu learning rate decay

# --------------------------------------------------------------------------------------------------

trump_input = layers.Input(shape=trump.shape[1:]) # Specify the shape of the inputs to the trump model for the graph
trump_encoded = encoder(trump_input) # Feed the inputs into the shared encoder
trump_decoded = buildDecoder()(trump_encoded) # Feed the trump encoded layer through a unique decoder layer

trump_lr = tf.keras.optimizers.schedules.ExponentialDecay(initial_learning_rate=1e-3, decay_steps=15000, decay_rate=0.9) # Create learning rate decay with an initial learning rate of 1e-3 that has a decay rate of 0.9 and will decay every 15000 steps
trump_model = tf.keras.models.Model(trump_input, trump_decoded) # Specify the inputs and outputs of the trump model so tensorflow can build a computation graph
trump_model.compile(loss=tf.keras.losses.MeanSquaredError(), optimizer=tf.keras.optimizers.Adam(learning_rate=trump_lr)) # Compile the keanu model with a mean squared error loss function, and an adam optimizer using our trump learning rate decay
```

<br />

### Training the model:
Now we'll go and train the model. We'll train the models for a total of 250 epochs, where each model will be trained 10 times for each iteration in the for loop, with a batch size of 48. The for loop will run for the amount of iterations that will make the total epochs by the models combined add up to roughly 250, defined by the formula <code>epochs / (2 x batch_epochs)</code>.

<br />

```python
epochs = 250 # Specify the number of total epochs to run for
cycle_epochs = 10 # Specify the number of epochs per training cycle

batch_size = 48 # Specify the batch size (adjust for your computer)

total_epochs_range = epochs // (2 * cycle_epochs) # Specify the amount of times to perform a 'training cycle'
for i in range(total_epochs_range): # Perform the training cycle as many times as we specified
    print(f"Total Epoch {i + 1} / {total_epochs_range}") # Print out the number of training cycles performed
    keanu_model.fit(keanu_train, keanu_train, epochs=cycle_epochs, batch_size=batch_size, validation_data=(keanu_valid, keanu_valid), shuffle=True) # Train the keanu model on the keanu train data with the input as the label (since this is an autoencoder), train for 'cycle_epochs' epochs with a batch size of 'batch_size', then validate on the keanu validation data with the labels as the keanu validation/test data
    trump_model.fit(trump_train, trump_train, epochs=cycle_epochs, batch_size=batch_size, validation_data=(trump_valid, trump_valid), shuffle=True) # Train the trump model on the trump train data with the input as the label (since this is an autoencoder), train for 'cycle_epochs' epochs with a batch size of 'batch_size', then validate on the trump validation data with the labels as the trump validation/test data
```

<br />

### Saving the model:
Now we will go and save the model so we can use the model in future without having to retrain it.

<br />

```python
keanu_model_path = ".\\models\\keanu_model.h5" # Specify the path to the keanu model - model name MUST end with .h5
keanu_model.save(keanu_model_path) # Save the keanu model to the keanu model path

trump_model_path = ".\\models\\trump_model.h5" # Specify the path to the trump model - model name MUST end with .h5
trump_model.save(trump_model_path) # Save the trump model to the trump model path
```

<br />

### Evaluating the model:
Now we will evaluate both model's using each model's respective validation/test data to see how well each model was learned during training.

<br />

```python
keanu_model.evaluate(keanu_valid, keanu_valid, batch_size=batch_size) # Evaluate the keanu reeves model on the keanu validation/test data with a batch size of 'batch_size'
trump_model.evaluate(trump_valid, trump_valid, batch_size=batch_size) # Evaluate the trump model on the trump validation/test data with a batch size of 'batch_size'
```

<br />

### Testing the model:
Now that the model has finished training, let's go and perform a face swap. We will take a sample of images from our <code>keanu_valid</code> data and a sample of images from our <code>trump_valid</code> data, then we will run these images through the <code>keanu_model</code> and the <code>trump_model</code>. We will then display our sample images, and the predictions made by our <code>keanu_model</code> and <code>trump_model</code> on these sample images. You should see that just after a few epochs and a small amount of training data, the <code>keanu_model</code> is able to swap Trump's face with Keanu's, and the <code>trump_model</code> is able to swap Keanu's face with Trumps. Success!

<br />

```python
import random
import matplotlib.pyplot as plt
%matplotlib inline
plt.rcParams["figure.figsize"] = (10, 10) # Set the dimensions to display the images at

image_count = 6 # Specify the number of images to sample
sample = np.array([random.choice(keanu_valid) for _ in range(image_count // 2)] + [random.choice(trump_valid) for _ in range(image_count // 2)]) # Randomly sample half of the total images from the keanu validation/test set, and the other half from the trump validation/test set
keanu_predictions = keanu_model(sample) # Use the keanu model to make predictions on the sample
trump_predictions = trump_model(sample) # Use the trump model to make predictions on the sample

# Print out the original sample images
print("sample")
for i, prediction in enumerate(sample): # Enumerate all images in the sample
    plt.subplot(1, image_count, i + 1) # Create a subplot and specify the location of the image
    plt.imshow(prediction) # Plot the image in its specified location
plt.show() # Show all of the images

# Print out the sample images after being fed through the keanu model
print("Keanu model")
for i, prediction in enumerate(keanu_predictions): # Enumerate the sample images that have been fed through the keanu model
    plt.subplot(1, image_count, i + 1) # Create a subplot and specify the location of the image
    plt.imshow(prediction) # Plot the image in its specified location
plt.show() # Show all of the keanu reeves model output images

# Print out the sample images after being fed through the trump model
print("Trump model")
for i, prediction in enumerate(trump_predictions): # Enumerate the sample images that have been fed through the trump model
    plt.subplot(1, image_count, i + 1) # Create a subplot and specify the location of the image
    plt.imshow(prediction) # Plot the image in its specified location
plt.show() # Show all of the trump model output images
```

<br />

### Improving the model:
The easiest way of improving the model is by adding more data and epochs. You can also play around with the shape and architecture of the model. Try adding more layers to the model so that the data reduction between each layer is less. I encourage you to play around with the model to achieve results that you're happy with!

<br />

### Outroduction:
So now you know how to build your own face swap program that you can apply to whoevers face you want. As stated before, go and play around and experiment the model to make it do what you want it to do. Because after all, the best way to learn is by doing!