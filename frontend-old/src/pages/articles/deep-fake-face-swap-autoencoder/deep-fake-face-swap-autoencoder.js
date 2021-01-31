import React from 'react';
import Gist from 'react-gist';
import style from '../article-style';

const DeepFakeFaceSwap = () => {
    return (
        <div class="container">
            <img class="responsive-img center" alt="Selective Focus Photography of Person Wearing Mask" src="https://images.pexels.com/photos/1362371/pexels-photo-1362371.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
            <p class="flow-text" style={style}>
                <b>Introduction</b>
                <br />
                <br />
                This article well demonstrate how you can build an autoencoder that can swap the face featured in an image with another. To do this we'll use a 
                a deep convolutional autoencoder that we will build using TensorFlow and Keras. This tutorial is for educational purposes only, I DO NOT condone any 
                misuse of this technology and I am NOT RESPONSIBLE for anything you do with it.
                <br />
                <br />
                The code for this tutorial, as well as the trained model can be found on my GitHub page <a href="https://github.com/OsbornAI/Deep-Fake-Face-Swap-Autoencoder" target="_blank" rel="noreferrer" >here</a>.
                <br />
                <br />
                To start off with you're going to need a dataset which contains the faces of the person you want to swap the face of and the persons face you want to swap the face with.
                For this tutorial, I will be swapping Donald Trump's face with Keanu Reeve's. I have created a dataset containing around 4000 images of each celebrities face sourced from Google Images. 
                All the images I have sourced fall under the Creative Commons License, so I will not be releasing this dataset as I do not own the rights to these images, however in an upcoming article I will be 
                demonstrating how you can create a dataset like this one for yourself, so make sure to stick around!
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Loading and preprocessing the images</b>
                <br />
                <br />
                Before we load in our images, we have to process them first. To do this we'll create a function which will load all of the images in a directory, convert them to RGB,
                resize them to be 64x64, and then store them in a list for further use. We will then normalize the values of the pixels that make up each images to be between 0 and 1 
                by diving them by 255.
                <br />
                <br />
                <Gist id="0c3815cfc29bb726ba9405aa414786dd" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Split the data</b>
                <br />
                <br />
                Now we'll go and write a function which will split our image dataset into a training set and a validation set. We'll do this by calculating the size of 90%
                of our data, then we'll say all the image data up to that point will become our training set, and the remaining data will be our validation set.
                <br />
                <br />
                <Gist id="75247d2d1e31157fc79ec6dc67c78fef" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Loading the data</b>
                <br />
                <br />
                Now we'll go and load in our face data. First of all I will load in the Keanu Reeve's face images using the <i>loadImages</i> function, with the argument set to the directory 
                that contains my Keanu Reeve's face images. I only want to load in 3000 of the images, so I'll specify that I only want the first 3000 items in the array. I'll 
                then split this image data into a training set <i>keanu_train</i> and a validation set <i>keanu_valid</i> using the <i>splitData</i> function with the argument set 
                as the raw <i>keanu</i> array.
                <br />
                <br />
                Now we'll go and repeat the same thing, but this time with the Trump face images. We'll use our <i>loadImages</i> function and set it's argument to be the directory 
                containing our trump face images, and I'll specify that I only want to load in 3000 of these images. I'll then split this image data into a training set <i>trump_train</i> and
                a validation set <i>trump_valid</i> using the <i>splitData</i> function, with the argument set as the raw <i>trump</i> array.
                <br />
                <br />
                <Gist id="2ebb82fc0f13668dff206f02894e81f5" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Building the model</b>
                <br />
                <br />
                Before we get started building the model, it's best if you understand how it works first. We create a single encoder, and two decoders. We train our encoder and one 
                of our decoders to reconstruct the images of the first persons face, then we use the same encoder with a different decoder to reconstruct the images of the second persons face. The autoencoder 
                then learns the features of a face which is represented in the bottleneck in the middle of the model (the smallest most compressed layer). The decoder then learns 
                to reconstruct these features into an image resembling the person it was trained on. So when we want to test our model by swapping the faces, we will feed the images of
                one of the people into the encoder, then we will feed this encoded vector into the other persons decoder to perform the face swap. Now let's build the model.
                <br />
                <br />
                We're going to be using a deep convolutional model. To start off we'll create a function which will build our encoder layer for us. This layer will consist of 
                10 2D convolutional layers with a ReLU activation function, same padding, and alternating step sizes (strides) of 1 and 2. These layers will reduce the dimensions of our 
                image from 64x64x3 (the 3 comes from the fact the image is RGB and has 3 channels), to 2x2x8. We will then flatten this result, and feed it into two dense layers with a ReLU activation function. 
                The final dense layer in our encoder model will represent the 24 encoded features that the model uses to represent the face.
                <br />
                <br />
                Now we will create the function which will build our decoding layer. It will start off with a dense layer with a ReLU activation function 
                which will scale our encoded features to have a size of 2x2x8, which was our original downsamping size. We will then reshape the outputs from our dense layer to be 2x2x8, 
                and then we will apply a series of Conv2DTranspose layers with alternating step sizes (strides) of 1 and 2. Finally, we will apply one last Conv2D layer with a sigmoid 
                activation function, same padding and a step size (stride) of 1. The outputs from this layer will have a shape of 64x64x3, the same as the original image of which we 
                are trying to reconstruct.
                <br />
                <br />
                Now we'll go ahead and define the model which will learn to reconstruct images of Keanu Reeves. First we will create our <i>encoder</i> layer which we will use in both models,
                then we will go and define a <i>keanu_input</i> input layer which gets fed into our <i>encoder</i> layer which then get's fed into a unique <i>keanu_decoded</i> decoding layer. We will then construct our model from these layers
                using the Keras functional API. We will then compile our model with a mean squared error loss function as this is a regression problem, and an ADAM optimizer. We will use a 
                decaying learning rate with an initial learning rate of 1e-3, that will have a decay rate of 0.9, and will decay every 15000 training steps. 
                <br />
                Now we'll do the same thing to create the model which will learn to reconstruct our Trump face images. We will create a <i>trump_input</i> input layer, which we will then feed into 
                our same <i>encoder</i> layer, which we will then feed into a unique <i>trump_decoded</i> decoding layer. We'll then go and create our model using the Keras functional API, then we'll compile our model 
                with a mean squared error loss function, and an ADAM optimizer. Once again we will use a decaying learning rate with an initial learning rateof 1e-3, that will have a decay rate of 0.9, 
                and will decay every 15000 training steps.
                <br />
                <br />
                <Gist id="4cfef4d93e9e4bffe9661258286f4a22" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Training the model</b>
                <br />
                <br />
                Now we'll go and train the model. We'll train the models for a total of 250 epochs, where each model will be trained 10 times for each iteration in the for loop, with a batch size of 48.
                The for loop will run for the amount of iterations that will make the total epochs by the models combined add up to roughly 250, defined by the formula <i>epochs / (2 x batch_epochs)</i>.
                <br />
                <br />
                <Gist id="f4a040acd7e9d10cf90cf03ee336ff75" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Saving the model</b>
                <br />
                <br />
                Now we will go and save the model so we can use the model in future without having to retrain it.
                <br />
                <br />
                <Gist id="0e1c8089b581feb1856019c42239c74e" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Evaluating the model</b>
                <br />
                <br />
                Now we will evaluate both model's using each model's respective validation/test data to see how well each model was learned during training.
                <br />
                <br />
                <Gist id="f97cee553314d1e4df584108f3ca57f3" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Testing the model</b>
                <br />
                <br />
                Now that the model has finished training, let's go and perform a face swap. We will take a sample of images from our <i>keanu_valid</i> data and a sample of images from our <i>trump_valid</i> data,
                then we will run these images through the <i>keanu_model</i> and the <i>trump_model</i>. We will then display our <i>sample</i> images, and the predictions made by our <i>keanu_model</i> and <i>trump_model</i> on 
                these sample images. You should see that just after a few epochs and a small amount of training data, the <i>keanu_model</i> is able to swap Trump's face with Keanu's, and the <i>trump_model</i> is 
                able to swap Keanu's face with Trumps. Success!
                <br />
                <br />
                <Gist id="68a7d0081f6b9edd56bdaf9b9ac2075d" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Improving the model</b>
                <br />
                <br />
                The easiest way of improving the model is by adding more data and epochs. You can also play around with the shape and architecture of the model. Try adding more layers to the model so that the data reduction between 
                each layer is less. I encourage you to play around with the model to achieve results that you're happy with!
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Outroduction</b>
                <br />
                <br />
                So now you know how to build your own face swap program that you can apply to whoevers face you want. As stated before, go and play around and experiment the model to make it do what you want it to do. 
                Because after all, the best way to learn is by doing!
            </p>
        </div>
    );
};

export default DeepFakeFaceSwap;