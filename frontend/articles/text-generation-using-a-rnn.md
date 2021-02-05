---
title: Text Generation Using A RNN
description: This article demonstrates how a recurrent neural network can be used to generate text one character at a time.
author: OsbornAI
date_published: 02/01/2021 
keywords: rnn, tensorflow, character generation, text generation, lstm, text generator, gru, tensorflow, python
---

![Pile of Scrabble Letter Pieces](https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:
In this article we're going to be building an RNN (Recurrent Neural Network) that generates text one character at a time. Before we get started it should be noted that the model we will be building in this episode certaintly won't be fooling any decent English teacher, but I encourage you to play around with the code featured to create a model that you're happy with. This tutorial is for educational purposes only, I DO NOT condone any misuse of this technology and I am NOT RESPONSIBLE for anything you do with it.


<br />

The code for this tutorial can be found on my GitHub page [here](https://github.com/OsbornAI/RNN-Text-Generation).

<br />

We're going to be using two datasets to train our model. The first dataset we'll be using is the Gutenberg dataset by Shibamouli Lahiri, which you can download [here](https://web.eecs.umich.edu/~lahiri/gutenberg_dataset.html). We will train our model on this dataset first so that our model will gain an understanding of the English language. Download this data and store it somewhere for use later. The second dataset we will be using will be the Alice In Wonderland book by Lewis Carroll, which was been uploaded for use [here](https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt) by [phillipj](https://github.com/phillipj). We will use this data to fine-tune our model so that our model generates text in the style of that written in Alice In Wonderland. We don't have to worry about downloading this data.

<br />

### Loading raw data:
Now that the data has been downloaded, we're going to read the contents of each file and store them in a <code>pandas</code> series. Set the <code>root</code> variable to be the location of the documents located within your downloaded Gutenberg dataset. We will then load these files, shuffle them, and then select a sample of documents.

<br />

Change the <code>number_of_files</code> variable to be the amount of documents you want to train your model with. The more documents you use the longer it will take to load, and the longer the model will take to train, however the extra data will result in a better trained model, and the extra data is necessary if you increase the size of the network to reduce the risk of overfitting.

<br />

We will then read the contents from each file then save it to a list. Finally, we'll convert this list to a Pandas series for easy processing later.

<br />

```python
import os
import pandas as pd
import numpy as np

root = "./documents" # Set this as the path to the downloaded dataset that contains the documents
files = list(os.listdir(root)) # Create a list of the files within the downloaded dataset
np.random.shuffle(files) # Shuffle the file names

number_of_files = 3 # The amount of documents you want to use. More documents = more data but slower training time

contents = [] # Create the list where we will store the contents of each file
for filename in files[:number_of_files]: # Iterate over the first 'number_of_files' files
    file_path = os.path.join(root, filename) # Create the path to the file
    
    with open(file_path, 'r', encoding='ISO-8859-1') as file: # Open the file
        file_contents = file.read() # Read the contents of the file
        
        contents.append(file_contents) # Store the contents of the file in the 'contents' array
        
text_dataset = pd.Series(contents) # Convert the 'contents' array to a Pandas series 'text_dataset' for use later
```

<br />

### Data cleaning:
Now let's go and clean up our dataset. I only want the model to contain letters, whitespaces and punctuation, so I'll go and make a string that contains these valid characters.

<br />

Next we'll create a function called <code>cleanText</code> that will take in a piece of text and the valid characters, then return the text without any invalid characters.

<br />

We'll then go and apply this function to each piece document contained within our <code>text_dataset</code> series, storing the series containing the cleaned documents in a variable named <code>text</code>.

<br />

```python
import string

valid_chars = string.ascii_letters + string.whitespace + string.punctuation # Create a list of valid characters for our model

def cleanText(text, valid_chars): # Filter out characters from the input text that are not in the valid characters list
    text_cleaned = "".join(char for char in text if char in valid_chars) # Remove all the the invalid characters from the input string
    
    return text_cleaned # Return the cleaned string

text = text_dataset.apply(lambda x: cleanText(x, valid_chars)) # Apply the 'cleanText' function to the Pandas series 'text_dataset' and store it in the 'text' Pandas series
```

<br />

### Data encoding:
Now we're going to create a dictionary called <code>char2num</code> which maps each of our valid characters to a unique number. We'll also create another dictionary called <code>num2char</code> which will map that number back to it's respective character.

<br />

Next we'll create a function which will encode each character in a sequence using an encoding dictionary.

<br />

We'll then go and apply this function to each document within our <code>text</code> series, and we'll store this result in a variable named <code>encoded</code>.

<br />

```python
char2num = {char: i for i, char in enumerate(valid_chars)} # Create a dictionary that maps each character to its respective number
num2char = {i: char for i, char in enumerate(valid_chars)} # Create a dictionary that maps each number to its respective character

def encode(text, encoding_dict): # Convert all the characters in a piece of text to their numerical forms or vice versa using the respective encoding dictionary
    encoded = [encoding_dict[char] for char in text] # Replace the character with its encoded form if the character is valid
    
    return encoded # Return the list of encoded characters

encoded = text.apply(lambda x: encode(x, char2num)) # Apply the 'encode' function to the Pandas series 'text' and store it in the 'encoded' Pandas series
```

<br />

### Dataset generation:
Now we will create two lists, <code>X</code> and <code>Y</code>. <code>X</code> will store our sequences of characters, and <code>Y</code> will store the character that should come after each sequence, which will act as the labels.

<br />

We will then create a function which will extract sequences of encoded characters that have a length of <code>seq_len</code> and the encoded character that comes after that encoded sequence from an encoded piece of text. We will append each sequence to the <code>X</code> list, and each label to the <code>Y</code> list.

<br />

The <code>seq_len</code> will be the length of the sequence that the network uses as its context for predicting the next character. A larger <code>seq_len</code> will allow the network to better understand the context leading to more accurate predictions, but will also increase the training time of the model. The <code>step</code> is the size of characters to skip between each sequence added to the dataset. A larger value for <code>step</code> will produce less data.

<br />

We will then apply our function to each document in our <code>encoded</code> series, which will populate our <code>X</code> list with sequences of data and our <code>Y</code> list with the label for it's corresponding sequence. We will then shuffle this data, and then one-hot encode the characters within our data.

<br />

```python
import tensorflow as tf

def createData(encoded_text, seq_len, X, Y, step): # Create sequences of characters from a set of encoded text, and give it the label of the character that comes after the sequence, then store the sequence in the X list and store the label in the Y list
    for i in range(0, len(encoded_text) - seq_len, step): # Iterate for each sequence in the input text every 'step' steps
        seq = encoded_text[i:seq_len + i] # Splice the text to create a new sequence
        label = encoded_text[seq_len + i] # Find the following character after the spliced text
        
        X.append(seq) # Append the sequence to the 'X' list
        Y.append(label) # Append the following character (label) to the 'Y' list

X = [] # Create the array we will store the sequences in
Y = [] # Create the array we will store the labels in

seq_len = 60 # This is the length of the text you feed to the network. Larger length = larger context understood by the network, but increased training time
step = 4 # The gap size between each selected sequence of characters and labels - larger gap = less training data

encoded.apply(lambda x: createData(x, seq_len, X, Y, step)) # Apply the 'createData' function to the text in the 'encoded' Pandas series, storing the sequences in the 'X' list and the labels in the 'Y' list

zipped = list(zip(X, Y)) # Zip the sequences with their respective labels together and store it in the 'zipped' variable
np.random.shuffle(zipped) # Shuffle the 'zipped' list

X = tf.keras.utils.to_categorical([tup[0] for tup in zipped], len(num2char)) # Seperate the sequences from the 'zipped' list into the 'X' variable and one hot encode the encoded text
Y = tf.keras.utils.to_categorical([tup[1] for tup in zipped], len(num2char)) # Seperate the labels from the 'zipped' list into the 'Y' variable and one hot encode the encoded text
```

<br />

### Create training and validation sets:
Now we will split our data into a training set and a validation set. We will use the training set to train our model, and the validation set to test how our model performs on unseen data.

<br />

First we'll specify the percentage of our data that we want to use in the <code>data_percent</code> list, and then we'll set our data_size to be the length of the data we will use. We will then set the <code>X_corrected</code> list to be our <code>X</code> list that contains the amount of data we specified, and the <code>Y_corrected</code> list to be our <code>Y</code> list that contains the amount of data we specified.

<br />

Next we'll create a <code>split_len</code> variable, which will have a value equal to 90% of our <code>data_size</code>. This means our training set will contain 90% of the data and our validation set will contain 10% of the data. We will then split our <code>X_corrected</code> and <code>Y_corrected</code> lists into a training set: <code>X_train</code>, <code>Y_train</code> and a validation set: <code>X_valid</code>, <code>Y_valid</code> using our <code>split_len</code> variable.

<br />

We'll then go and print the length of our training set and validation set to observe the amount of data within each set

<br />

```python
data_percent = 1.0 # Set this to the percentage of the total data you wish to use
data_size = int(data_percent * len(X)) # Specify the amount of data to be used

X_corrected = X[:data_size] # Split the sequences to only include the data up to the 'data_size'
Y_corrected = Y[:data_size] # Split the labels to only include the data up to the 'data_size'

split_len = int(0.9 * data_size) # Specify the size of 90% of the data

X_train = X_corrected[:split_len] # Split 90% of the corrected sequences to be used in the training set
Y_train = Y_corrected[:split_len] # Split 90% of the corrected labels to be used in the training set

X_valid = X_corrected[split_len:] # Specify the remaining corrected sequences to be used in the validation/test set
Y_valid = Y_corrected[split_len:] # Specify the remaining corrected labels to be used in the validation/test set

print(f"{split_len} training samples | {corrected_size - split_len} validation samples") # Print out the size of our training set and validation/test set
```

<br />

### Model building:
Now we'll go and build the model that will be responsible for predicting the next character in a sequence. The model will contain an input layer fed into a bidirectional LSTM which will be the bulk of the network, then we will feed it into a dropout layer, and then finally into a dense layer.

<br />

The input layer will take a shape of (<code>seq_len</code>, <code>valid_chars</code>). This is because each input to our network will contain a <code>seq_len</code> amount of one-hot encoded characters that each have a size of the amount of valid characters specified.

<br />

We will use 448 hidden units for the LSTM layer used in our bidirectional layer.

<br />

We will use a dropout rate of 0.5, meaning each activation has a 50% chance of being set to 0. This will help prevent our model from overfitting.

<br />

We will give our dense layer an output size of <code>valid_chars</code>, as each output will represent a character. We won't use an activation function on this layer as we want the raw logits.

<br />

Feel free to play around and experiment with the network to fit your needs.

<br />

We will then go and compile this model, with a categorical crossentropy loss function that accepts raw logits. We will use the ADAM optimizer with a learning rate of 0.0005 (5e-4), and track the accuracy metric.

<br />

```python
def buildModel(valid_chars, seq_len, lstm_units, dropout_rate): # Create and return a bidirectional LSTM model given the input: 'valid_chars' - the number of valid characters in our dataset, 'seq_len' - the size of the sequences we will feed to the network, 'lstm_units' - the output size of the bidrectional LSTM layer, 'dropout_rate' - the percent chance that the neurons within the network will be randomly set to zero during training
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input(shape=(seq_len, valid_chars)), # Specify the shape of the inputs we will feed to the network
        tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(lstm_units)), # Create the bidirectional LSTM layer with an output size of 'lstm_units'
        tf.keras.layers.Dropout(dropout_rate), # Create a dropout layer with a dropout rate of 'dropout_rate'
        tf.keras.layers.Dense(valid_chars) # Create a final dense layer to output raw logits with a size of our valid characters
    ])
    
    return model # Return the model
    
model = buildModel(len(valid_chars), seq_len, 448, 0.5) # Build the model using the 'buildModel' function with the specified hyperparameters
model.compile(loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True), optimizer=tf.keras.optimizers.Adam(5e-4), metrics=['accuracy']) # Compile the model with categorical crossentropy loss from logits, an ADAM optimizer with a learning rate of 5e-4, and specifying that we want to track the accuracy metric
```

<br />

### Text generation function:
Now we'll create a function that will take in a piece of text and will predict the characters that come after it.

<br />

To start off with we will clean the text we feed to the function and then encode it using our <code>char2num</code> dictionary. Then we will take the last <code>seq_len</code> amount of characters for our model to use as its context for predicting the next character.

<br />

Now we will get into our character generating loop. We will take the last <code>seq_len</code> amount of encoded characters, and will one-hot encode them. We will then feed these one-hot encoded characters into our model which will become our predictions for the next character. We will then divide these prediction logits by a <code>temperature</code> variable. The higher the <code>temperature</code> the more random the predicted character. We'll then feed these scaled prediction logits into a categorical distribution, then take a sample from this distribution, which will be our predicted character. We'll then append this character to our <code>encoded</code> list and <code>encoded_fixed</code> list, then repeat the process <code>gen_length</code>, where <code>gen_length</code> is the number of characters we wish to generate.

<br />

Finally we'll decode each item in our <code>encoded</code> list into it's character representation using our <code>num2char</code> dictionary. We will then join these characters together into a string, then return it.

<br />

```python
def genSequence(model, valid_chars, gen_length, seq_len, seed_text, char2num, num2char, temperature): # Create a function that will predict the next characters from an inout sequence
    text_cleaned = cleanText(seed_text, valid_chars) # Clean the text using the 'cleanText' function
    encoded = encode(text_cleaned, char2num) # Encode the cleaned text
    
    seq_start = len(text_cleaned) - seq_len # Calculate the start character to take the sequence from
    assert(seq_start > -1) # Make sure that the seed length is long enough
    encoded_fixed = encoded[seq_start:] # Specify the encoded characters to be used for the character generation
    
    for i in range(gen_length): # Repeat this process for the amount of characters we wish to generate
        sequence = tf.keras.utils.to_categorical(np.array(encoded_fixed[i:seq_len + i]), len(valid_chars)) # Sepcify the sequence of characters we wish to use and apply categorical encoding to them
        
        predictions = model.predict(tf.expand_dims(sequence, 0)) / temperature # Generate the predictions from our sequence using the model, then divide by a temperature variable to increase the randomness of the next character generated
        
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy() # Sample the next encoded character from a categorical distribution. Higher temperatures results in more random selection
        
        encoded_fixed.append(predicted_id) # Append the predicted encoded character to the encoded fixed list
        encoded.append(predicted_id) # Append the predicted encoded character to the encoded list
        
    return "".join(encode(encoded, num2char)) # Convert the encoded characters to their character form and join them together to form a string
```

<br />

### Model training:
We will set the <code>epochs</code> to be 20, and then the <code>cycle_epochs</code> to be 5. This means that each training cycle we will do 5 epochs before using the newly trained model to predict the next characters in a sequence. We will then set our <code>batch_size</code> during training to be 64. You can change this depending on the computation power of the computer you are using.

<br />

Now we're going to train our model. First of all we'll declare a <code>seed_text</code> variable. We will generate predictions from this text during training to observe the models performance.

<br />

Now we will create a for loop that will run for <code>training_loop_iterations</code> which will be the <code>epochs</code> divided by the <code>cycle_epochs</code>. We do this to assess the models performance during training. For each training cycle we will train our model for 5 epochs, then we will use our <code>genSequence</code> function with our <code>seed_text</code> to observe our models performance during training.

<br />

```python
epochs = 20 # Total number of epochs to train for
cycle_epochs = 5 # Number of epochs per training cycle

batch_size = 64 # Set the batch size

# Create some 'seed_text' to test out model on every few iterations
seed_text = '''It is for us the living, rather, to be dedicated here to the unfinished
                work which they who fought here have thus far so nobly advanced.
                It is rather for us to be here dedicated to the great task remaining
                before us. . .that from these honored dead'''

training_loop_iterations = epochs // cycle_epochs # Set the number of training cycle iterations
for i in range(training_loop_iterations): # Repeat our training loop 4 times
    model.fit(X_train, Y_train, epochs=cycle_epochs, batch_size=batch_size, validation_data=(X_valid, Y_valid), verbose=1) # Train our model on our training data for 5 epochs, with a batch size of 64 (adjust for your PC), validating the model on our validation/test data
    
    genned_text = genSequence(model, valid_chars, 200, seq_len, seed_text, char2num, num2char, 0.8) # Use our 'genSequence' function to test the predictions made by the model on our 'seed_text'
    print(f"Text for epoch {i + 1} / {training_loop_iterations}: {genned_text}") # Print out the generated text
```

<br />

### Saving the model:
Now we will go and save our model to a file that can be loaded whenever we want to use it.

<br />

Change the <code>model_path</code> variable to the name and directory you want to save your model to. Your model's name MUST end with .h5.

<br />

```python
model_path = "./model/model.h5" # Set this as the directory to save the model to with the name you want the saved model to have - filename MUST have .h5 at the end

model.save(model_path) # Save the model to the file and location specified by 'model_path'
```

<br />

### Model evaluation:
Now we'll go and evaluate our model on our validation set. I encourage you to play around with the code to achieve an evaluation loss and accuracy that you're happy with.

<br />

```python
model.evaluate(X_valid, Y_valid, batch_size=batch_size) # Evaluate our model on the validation/test set
```

<br />

### Loading fine-tuning data (Alice's Adventures in Wonderland):
Now we're going to fine-tune our model to generate text in the style of Alice in Wonderland.

<br />

We'll start off by scraping the book from the website using the <code>requests</code> library. We'll then remove the star pattern present within the book. Next we'll apply our <code>cleanText</code> function with our <code>valid_chars</code>, and then we'll encode the cleaned text using our <code>encode</code> function and our <code>char2num</code> dictionary.

<br />

```python
import requests

r = requests.get('https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt') # Load in the text from this URL
text = r.text.replace('''*       *       *       *       *       *       *
         *       *       *       *       *       *
     *       *       *       *       *       *       *''', ' ') # Remove this pattern from the data

cleaned_text = cleanText(text, valid_chars) # Clean the alice in wonderland text data
encoded_text = encode(cleaned_text, char2num) # Encode the alice in wonderland text data
```

<br />

### Creating the dataset from the Alice in Wonderland novel:
Now we'll use our <code>createData</code> function on our <code>encoded_text</code> to make two new lists of data: <code>X</code> which contains the sequences of text, and <code>Y</code> which contains the character that comes after the sequence. We will then shuffle our data, and one-hot encode each encoded character within our <code>X</code> and <code>Y</code> lists.

<br />

```python
X = [] # Create the list where we will store the encoded sequences for the alice in wonderland text
Y = [] # Create the list where we will store the encoded labels for the alice in wonderland text

createData(encoded_text, seq_len, X, Y, step) # Create the encoded sequences and encoded labels for the alice in wonderland text data and store the sequences in the 'X' list and the labels in the 'Y' list

zipped = list(zip(X, Y)) # Zip the encoded sequences and labels together into a single list
np.random.shuffle(zipped) # Shuffle the encoded sequences and labels list

X = tf.keras.utils.to_categorical([tup[0] for tup in zipped], len(num2char)) # Extract the encoded sequences from the zipped list and one hot encode them
Y = tf.keras.utils.to_categorical([tup[1] for tup in zipped], len(num2char)) # Extract the encoded labels from the zipped list and one hot encode them
```

<br />

### Create training and validation/testing set from Alice in Wonderland dataset:
Now we'll go and split our new data into a training set and a validation set. Once again we'll use 90% of the data for training, and the other 10% will be used for validating the model.

<br />

We'll then go and print out the size of our training set and validation set.

<br />

```python
data_percent = 1.0 # Set this to the percentage of the total data you wish to use
data_size = int(data_percent * len(X)) # Specify the amount of data to be used

X_corrected = X[:data_size] # Split the sequences to only include the data up to the 'data_size'
Y_corrected = Y[:data_size] # Split the labels to only include the data up to the 'data_size'

split_len = int(0.9 * data_size) # Specify the size of 90% of the data

X_train = X_corrected[:split_len] # Split 90% of the corrected sequences to be used in the training set
Y_train = Y_corrected[:split_len] # Split 90% of the corrected labels to be used in the training set

X_valid = X_corrected[split_len:] # Specify the remaining corrected sequences to be used in the validation/test set
Y_valid = Y_corrected[split_len:] # Specify the remaining corrected labels to be used in the validation/test set

print(f"{split_len} training samples | {corrected_size - split_len} validation samples") # Print out the size of our training set and validation/test set
```

<br />

### Fine-tuning the base model to the new data:
Now we're going to fine-tune our pre-trained model to the Alice in Wonderland data. We'll start off by declaring a <code>seed_text</code> variable, which the model will generate predictions with after it's finished training. We'll then go and use our genSequence function to predict the characters that come after our seed_text, which we'll print out to see what the model has generated.

<br />

```python

# Create some 'seed_text' to test out model on after training
seed_text = '''There seemed to be no use in waiting by the little door, so she
went back to the table, half hoping she might find another key'''

model.fit(X_train, Y_train, epochs=5, batch_size=batch_size, validation_data=(X_valid, Y_valid), verbose=1) # Fit the model to our training data, over 5 epochs, with a batch size of 64 (adjust for your PC), and validating on our validation/test data

genned_text = genSequence(model, valid_chars, 200, seq_len, seed_text, char2num, num2char, 0.8) # Use our 'genSequence' function to generate the characters that follow our 'seed_text'
print(genned_text) # Print out the generated characters
```

<br />

### Saving the fine-tuned model:
Now we will go and save our fine-tuned model to a file that can be loaded whenever we want to use it.

<br />

Change the <code>alice_model_path</code> variable to the name and directory you want to save your new adapted model to. Your model's name MUST end with .h5.

<br />

```python
alice_model_path = "./model/alice_model.h5" # Set this as the directory to save the model to with the name you want the saved model to have - filename MUST have .h5 at the end

model.save(alice_model_path) # Save the alice model to the file and location specified by 'alice_model_path'
```

<br />

### Evaluating fine-tuned model:
Finally we'll go and evaluate our model on our validation set. You should find that the adapted model's validation loss and accuracy are better than the original baseline model.

<br />

```python
alice_model.evaluate(X_valid, Y_valid, batch_size=batch_size) # Evaluate the model on the validation/test set
```

<br />

### Outroduction:
So now you know how to use a RNN to generate characters to form a sequence. I encourage you to play around with the code featured in this article. Change the training data, change the amount of training data, change the models architecture, do whatever helps you to better understand natural language processing and recurrent neural networks. Because the best way to learn is by doing.

<br />

### Credits:
Gutenberg Dataset:
 - Author: Shibamouli Lahiri
 - Title: Complexity of Word Collocation Networks: A Preliminary Structural Analysis
 - Booktitle: Proceedings of the Student Research Workshop at the 14th Conference of the European Chapter of the Association for Computational Linguistics
 - Publish Date: April 2014
 - Address: Gothenburg, Sweden
 - Publisher: Association for Computational Linguistics
 - Pages: 96-105
 - URL: [https://bit.ly/391s7bQ](https://bit.ly/391s7bQ), [https://bit.ly/2Lgks13](https://bit.ly/2Lgks13)

Alice In Wonderland:
 - Dataset Provider: [https://bit.ly/3hBJbc9](https://bit.ly/3hBJbc9)
 - Dataset Link: [https://bit.ly/3b6a5rk](https://bit.ly/3b6a5rk)
 - Author: Lewis Carroll
 - Booktitle: Alice's Adventures In Wonderland
 - Publish Date: November 1865
 - Publisher: Macmillan Publishers
 - Illustrator: John Tennial
 - Pages: 88
 - Book URL: [https://amzn.to/2X4WCIa](https://amzn.to/2X4WCIa)
