import React from 'react';
import Gist from 'react-gist';
import style from '../articleStyle';

const RNNTextGeneration = () => {
    return (
        <div class="container">
            <img class="responsive-img center" alt="Pile of Scrabble Letter Pieces" src="https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
            <p class="flow-text" style={style}>
                <b>Introduction</b>
                <br />
                <br />
                In this article we're going to be building an RNN (Recurrent Neural Network) that generates text one character at a time. Before we get started it should be noted
                that the model we will be building in this episode certaintly won't be fooling any decent English teacher, but I encourage you to play around with the code
                featured to create a model that you're happy with. This tutorial is for educational purposes only, I DO NOT condone any misuse of this technology and I am NOT RESPONSIBLE for anything you do with it.
                <br />
                <br />
                The code for this tutorial can be found on my GitHub page <a href="https://github.com/OsbornAI/RNN-Text-Generation" target="_blank" rel="noreferrer">here</a>.
                <br />
                <br />
                We're going to be using two datasets to train our model. The first dataset we'll be using is the Gutenberg dataset by Shibamouli Lahiri, which you can 
                download <a href="https://web.eecs.umich.edu/~lahiri/gutenberg_dataset.html" target="_blank" rel="noreferrer">here</a>. We will train our model on this
                dataset first so that our model will gain an understanding of the English language. Download this data and store it somewhere for use later. The second 
                dataset we will be using will be the Alice In Wonderland book by Lewis Carroll, which was been uploaded for 
                use <a href="https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt" target="_blank" rel="noreferrer">here</a> by <a href="https://github.com/phillipj" target="_blank" rel="noreferrer">phillipj</a>. We
                will use this data to fine-tune our model so that our model generates text in the style of that written in Alice In Wonderland. We don't have to worry about downloading
                this data.
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Loading raw data</b>
                <br />
                <br />
                Now that the data has been downloaded, we're going to read the contents of each file and store them in a Pandas series. Set the <i>root</i> variable to be
                the location of the documents located within your downloaded Gutenberg dataset. We will then load these files, shuffle them, and then select a sample of
                documents.
                <br />
                <br />
                Change the <i>number_of_files</i> variable to be the amount of documents you want to train your model with. The
                more documents you use the longer it will take to load, and the longer the model will take to train, however the extra data will result in a better
                trained model, and the extra data is necessary if you increase the size of the network to reduce the risk of overfitting. 
                <br />
                <br />
                We will then read the contents from each file then save it to a list. Finally, we'll convert this list to a Pandas series for easy processing later.
                <br />
                <br />
                <Gist id="64b04ba0ca8a9107a017afa1bd6394ee" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Data cleaning</b>
                <br />
                <br />
                Now let's go and clean up our dataset. I only want the model to contain letters, whitespaces and punctuation, so I'll go and make a string that contains these
                valid characters. 
                <br />
                <br />
                Next we'll create a function called <i>cleanText</i> that will take in a piece of text and the valid characters, then return the text 
                without any invalid characters. 
                <br />
                <br />
                We'll then go and apply this function to each piece document contained within our <i>text_dataset</i> series, storing the
                series containing the cleaned documents in a variable named <i>text</i>.
                <br />
                <br />
                <Gist id="0e919d287678e2dd2255a447e2270a42" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Data encoding</b>
                <br />
                <br />
                Now we're going to create a dictionary called <i>char2num</i> which maps each of our valid characters to a unique number. We'll also create another dictionary 
                called <i>num2char</i> which will map that number back to it's respective character.
                <br />
                <br />
                Next we'll create a function which will encode each character in a sequence using an encoding dictionary. 
                <br />
                <br />
                We'll then go and apply this function to each document within our <i>text</i> series, and we'll store this result in a variable named <i>encoded</i>.
                <br />
                <br />
                <Gist id="f6baf493112a801f46108768713dab29" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Dataset generation</b>
                <br />
                <br />
                Now we will create two lists, <i>X</i> and <i>Y</i>. <i>X</i> will store our sequences of characters, and <i>Y</i> will store the character that should come after each sequence,
                which will act as the labels.
                <br />
                <br />
                We will then create a function which will extract sequences of encoded characters that have a length of <i>seq_len</i> and the encoded character that comes after that encoded sequence from 
                an encoded piece of text. We will append each sequence to the <i>X</i> list, and each label to the <i>Y</i> list. 
                <br />
                <br />
                The <i>seq_len</i> will be the length of the sequence that the network uses as its context for predicting the next character. A larger <i>seq_len</i> will 
                allow the network to better understand the context leading to more accurate predictions, 
                but will also increase the training time of the model. The <i>step</i> is the size of characters to skip between each sequence added to the dataset. A 
                larger <i>step</i> will produce less data.
                <br />
                <br />
                We will then apply our function to each document in our <i>encoded</i> series, which will populate our <i>X</i> list with sequences of data 
                and our <i>Y</i> list with the label for it's corresponding sequence. We will then shuffle this data, and then one-hot encode the characters within our data.
                <br />
                <br />
                <Gist id="cbb648dceed421e0d7dc9a6473056ab4" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Create training and validation sets</b>
                <br />
                <br />
                Now we will split our data into a training set and a validation set. We will use the training set to train our model, and the validation set to test how our
                model performs on unseen data. 
                <br />
                <br />
                First we'll specify the percentage of our data that we want to use in the <i>data_percent</i> list, and then we'll set our <i>data_size</i> to be the length
                of the data we will use. We will then set the <i>X_corrected</i> list to be our <i>X</i> list that contains the amount of data we specified, 
                and the <i>Y_corrected</i> list to be our <i>Y</i> list that contains the amount of data we specified.
                <br />
                <br />
                Next we'll create a <i>split_len</i> variable, which will have a value equal to 90% of our <i>data_size</i>. This means our training set will contain
                90% of the data and our validation set will contain 10% of the data. We will then split our <i>X_corrected</i> and <i>Y_corrected</i> lists into
                a training set: <i>X_train</i>, <i>Y_train</i> and a validation set: <i>X_valid</i>, <i>Y_valid</i> using our <i>split_len</i> variable.
                <br />
                <br />
                We'll then go and print the length of our training set and validation set to observe the amount of data within each set.
                <br />
                <br />
                <Gist id="02ac5eb3d9db94761cef44a980e2034e" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Model building</b>
                <br />
                <br />
                Now we'll go and build the model that will be responsible for predicting the next character in a sequence. The model will contain an input layer 
                fed into a bidirectional LSTM which will be the bulk of the network, then we will feed it into a dropout layer, and then finally into a dense layer.
                <br />
                <br />
                The input layer will take a shape of <i>(seq_len, valid_chars)</i>. This is because each input to our network will contain a <i>seq_len</i> amount of 
                one-hot encoded characters that each have a size of the amount of valid characters specified. 
                <br />
                <br />
                We will use 448 hidden units for the LSTM layer used in our bidirectional layer.
                <br />
                <br />
                We will use a dropout rate of 0.5, meaning each activation has a 50% chance of being set to 0. This will help prevent our model from overfitting.
                <br />
                <br />
                We will give our dense layer an output size of <i>valid_chars</i>, as each output will represent a character. We won't use an activation function
                on this layer as we want the raw logits.
                <br />
                <br />
                Feel free to play around and experiment with the network to fit your needs.
                <br />
                <br />
                We will then go and compile this model, with a categorical crossentropy loss function that accepts raw logits. We will use the ADAM optimizer with a learning rate of 
                0.0005 (5e-4), and track the accuracy metric.
                <br />
                <br />
                <Gist id="3cbd4a82b4558498413d65ba69d62072" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Text generation function</b>
                <br />
                <br />
                Now we'll create a function that will take in a piece of text and will predict the characters that come after it.
                <br />
                <br />
                To start off with we will clean the text we feed to the function and then encode it using our <i>char2num</i> dictionary. Then we will take 
                the last <i>seq_len</i> amount of characters for our model to use as its context for predicting the next character.
                <br />
                <br />
                Now we will get into our character generating loop. We will take the last <i>seq_len</i> amount of encoded characters, and will one-hot encode them.
                We will then feed these one-hot encoded characters into our model which will become our predictions for the next character. We will then divide these
                prediction logits by a temperature variable. The higher the temperature the more random the predicted character. We'll then feed these scaled prediction logits
                into a categorical distribution, then take a sample from this distribution, which will be our predicted character. We'll then append this character to our
                <i>encoded</i> list and <i>encoded_fixed</i> list, then repeat the process for as many characters as we wish to generate.
                <br />
                <br />
                Finally we'll decode each item in our <i>encoded</i> list into it's character representation using our <i>num2char</i> dictionary. We will then 
                join these characters together into a string, then return it.
                <br />
                <br />
                <Gist id="93569b76bcbfc8eba72ede6af16d95c5" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Model training</b>
                <br />
                <br />
                We will set the <i>epochs</i> to be 20, and then the <i>cycle_epochs</i> to be 5. This means that each training cycle we will do 5 epochs before using the newly trained 
                model to predict the next characters in a sequence. We will then set our <i>batch_size</i> during training to be 64. You can change this depending on the computation power 
                of the computer you are using. 
                <br />
                <br />
                Now we're going to train our model. First of all we'll declare a <i>seed_text</i> variable. We will generate predictions from this text during training
                to observe the models performance. 
                <br />
                <br />
                Now we will create a for loop that will run for <i>training_loop_iterations</i> which will be the <i>epochs</i> divided by the <i>cycle_epochs</i>. We do this to assess 
                the models performance during training. For each training cycle we will train our model for 5 epochs, then we will use our <i>genSequence</i> function with our <i>seed_text</i> to 
                observe our models performance during training.
                <br />
                <br />
                <Gist id="d0574942c21ee60afd4f491b5a388420" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Saving the model</b>
                <br />
                <br />
                Now we will go and save our model to a file that can be loaded whenever we want to use it.
                <br />
                <br />
                Change the <i>model_path</i> variable to the name and directory you want to save your model to. Your model's name MUST end with <i>.h5</i>.
                <br />
                <br />
                <Gist id="5d8c44309ee44238f9c0385f24226e24" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Model evaluation</b>
                <br />
                <br />
                Now we'll go and evaluate our model on our validation set. I encourage you to play around with the code to achieve an 
                evaluation loss and accuracy that you're happy with.
                <br />
                <br />
                <Gist id="c62e8babd258950c45ca4809835c1d84" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Loading fine-tuning data (Alice's Adventures in Wonderland)</b>
                <br />
                <br />
                Now we're going to fine-tune our model to generate text in the style of Alice in Wonderland. 
                <br />
                <br />
                We'll start off by scraping the book from the website using the requests library. We'll then remove the star pattern present within the book. Next
                we'll apply our <i>cleanText</i> function with our <i>valid_chars</i>, and then we'll encode the cleaned text using our <i>encode</i> function and 
                our <i>char2num</i> dictionary.
                <br />
                <br />
                <Gist id="ecc2222da0c58cef7c3df155469b1bc1" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Creating the dataset from the Alice in Wonderland novel</b>
                <br />
                <br />
                Now we'll use our <i>createData</i> function on our <i>encoded_text</i> to make two new lists of data: <i>X</i> which contains the sequences of text,
                and <i>Y</i> which contains the character that comes after the sequence. We will then shuffle our data, and one-hot encode each encoded character within 
                our <i>X</i> and <i>Y</i> lists.
                <br />
                <br />
                <Gist id="2d2ec89bf75450beed3ac0355b508a5f" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Create training and validation/testing set from Alice in Wonderland dataset</b>
                <br />
                <br />
                Now we'll go and split our new data into a training set and a validation set. Once again we'll use 90% of the data for training, and the other 10%
                will be used for validating the model.
                <br />
                <br />
                We'll then go and print out the size of our training set and validation set.
                <br />
                <br />
                <Gist id="05f68edbca8aeaedf555f357911947fd" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Fine-tuning the base model to the new data</b>
                <br />
                <br />
                Now we're going to fine-tune our pre-trained model to the Alice in Wonderland data. We'll start off by declaring a <i>seed_text</i> variable, which the model 
                will generate predictions with after it's finished training. We'll then go and use our <i>genSequence</i> function to predict the characters that come after 
                our <i>seed_text</i>, which we'll print out to see what the model has generated.
                <br />
                <br />
                <Gist id="459e838169860c3d24109097c277e1ed" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Saving the fine-tuned model</b>
                <br />
                <br />
                Now we will go and save our fine-tuned model to a file that can be loaded whenever we want to use it.
                <br />
                <br />
                Change the <i>alice_model_path</i> variable to the name and directory you want to save your new adapted model to. 
                Your model's name MUST end with <i>.h5</i>..
                <br />
                <br />
                <Gist id="33710b0e6badf461ddc304b4ecdceb1f" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Evaluating fine-tuned model</b>
                <br />
                <br />
                Finally we'll go and evaluate our model on our validation set. You should find that the adapted model's validation loss and accuracy are better than the 
                original baseline model.
                <br />
                <br />
                <Gist id="47104e5cf45662c31c9ea8ff04ece613" />
            </p>
            <br />
            <p class="flow-text" style={style}>
                <b>Outroduction</b>
                <br />
                <br />
                So now you know how to use a RNN to generate characters to form a sequence. I encourage you to play around with the code featured in this article.
                Change the training data, change the amount of training data, change the models architecture, do whatever helps you to better understand 
                natural language processing and recurrent neural networks. Because the best way to learn is by doing.
            </p>
            <br />
            <p class="flow-text center" style={{fontWeight: 600}}>Credits:</p>
            <div class="row">
                <div class="col">
                    <p style={{fontWeight: 500}}>Gutenberg Dataset</p>
                    <ul>
                        <li>Author: Shibamouli Lahiri</li>
                        <li>Title: Complexity of Word Collocation Networks: A Preliminary Structural Analysis</li>
                        <li>Booktitle: Proceedings of the Student Research Workshop at the 14th Conference of the European Chapter of the Association for Computational Linguistics</li>
                        <li>Publish Date: April 2014</li>
                        <li>Address: Gothenburg, Sweden</li>
                        <li>Publisher: Association for Computational Linguistics</li>
                        <li>Pages: 96-105</li>
                        <li>URL: <a href="https://bit.ly/391s7bQ" target="_blank" rel="noreferrer">https://bit.ly/391s7bQ</a>, <a href="https://bit.ly/2Lgks13" target="_blank" rel="noreferrer">https://bit.ly/2Lgks13</a></li>
                    </ul>
                </div>
                <div class="col">
                    <p style={{fontWeight: 500}}>Alice In Wonderland</p>
                    <ul>
                        <li>Dataset Provider: <a href="https://bit.ly/3hBJbc9" target="_blank" rel="noreferrer">https://bit.ly/3hBJbc9</a></li>
                        <li>Dataset Link: <a href="https://bit.ly/3b6a5rk" target="_blank" rel="noreferrer">https://bit.ly/3b6a5rk</a></li>
                        <li>Author: Lewis Carroll</li>
                        <li>Booktitle: Alice's Adventures In Wonderland</li>
                        <li>Publish Date: November 1865</li>
                        <li>Publisher: Macmillan Publishers</li>
                        <li>Illustrator: John Tennial</li>
                        <li>Pages: 88</li>
                        <li>Book URL: <a href="https://amzn.to/2X4WCIa" target="_blank" rel="noreferrer">https://amzn.to/2X4WCIa</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RNNTextGeneration;