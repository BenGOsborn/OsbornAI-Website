import Gist from 'react-gist';

const RNNCharacterGeneration = () => {
    return (
        <div className="Article1">
            <div class="container">
                {/* The tense changes within the first paragraph - I have to change this */}
                <img class="responsive-img center" alt="Pile of Scrabble Letter Pieces" src="https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
                <p class="flow-text">
                    Today we're going to be using a RNN (Recurrent Neural Network) to generate text one character at a time. Before we get started it should be noted
                    that the model we will be building in this episode certaintly won't be fooling any decent English teacher, but I encourage you to play around with the code
                    featured to create a model that you're happy with.
                    <br />
                    <br />
                    The code for this tutorial can be found on my GitHub page <a href="https://github.com/OsbornAI/RNN-Character-Generationl" target="_blank" rel="noreferrer">here</a>.
                    <br />
                    <br />
                    We're going to be using two datasets to train our model. The first dataset we'll be using is the Gutenberg dataset by Shibamouli Lahiri, which you can 
                    download <a href="https://web.eecs.umich.edu/~lahiri/gutenberg_dataset.html" target="_blank" rel="noreferrer">here</a>. We will train our model on this
                    dataset first so that our model will gain an understanding of the English language. Download this data and store it somewhere for use later. The second 
                    dataset we will be using will be the Alice In Wonderland book by Lewis Carroll, which was been uploaded for use 
                    <a href="https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt" target="_blank" rel="noreferrer">here</a> by <a href="https://github.com/phillipj" target="_blank" rel="noreferrer">phillipj</a>. 
                    We will use this data to fine tune our model so that our model generates text in the style of that written in Alice In Wonderland. We don't have to worry about downloading
                    this data.
                </p>
                <br />
                <br />
                <p class="flow-text">
                    Now that the data has been downloaded, we're going to read the contents of each file and store them in a Pandas series. Set the <i>root</i> variable to be
                    the location of the documents located within your downloaded Gutenberg dataset. We will then load these files, shuffle them, and then select a sample of
                    documents.
                    <br />
                    <br />
                    Change the <i>number_of_files</i> variable to be the amount of documents you want to train your model with. I have used 3 to save time. The
                    more documents you use the longer it will take to load, and the longer the model will take to train, however the extra data will result in a better
                    trained model, and the extra data is necessary if you increase the size of the network to reduce the risk of overfitting. 
                    <br />
                    <br />
                    We will then read the contents from each file then save it to a list. Finally, we'll convert this list to a Pandas series for easy processing later.
                    <br />
                    <br />
                    <Gist id="d17c1c32cde33560473617f9bbeddb55" />
                </p>
                <br />
                <br />
                <p class="flow-text">
                    Now let's go and clean up our dataset. I only want the model to contain letters, whitespaces and punctuation, so I'll go and make a string that contains these
                    valid characters. 
                    <br />
                    <br />
                    Next I'll create a function called <i>cleanText</i> that will take in a piece of text and the valid characters, then return the text 
                    without any invalid characters. 
                    <br />
                    <br />
                    I'll then go and apply this function to each piece document contained within our <i>text_dataset</i> series, storing the
                    series containing the cleaned documents in a variable named <i>text</i>.
                    <br />
                    <br />
                    <Gist id="9bf74b90962f0c40947a877851c3728f" />
                </p>
                <br />
                <br />
                <p class="flow-text">
                    Now we're going to create a dictionary called <i>char2num</i> which maps each of our valid characters to a unique number. We'll also create another dictionary 
                    called <i>num2char</i> which will map that number back to it's respective character.
                    <br />
                    <br />
                    Next we'll create a function which will encode each character within a piece of text into it's numerical form using our <i>char2num</i> dictionary. 
                    <br />
                    <br />
                    We'll then go and apply this function to each document within our <i>text</i> series, and we'll store this result in a variable named <i>encoded</i>.
                    <br />
                    <br />
                    <Gist id="c929a91aa34cb45acb92aa9dc526b3ae" />
                </p>
                <br />
                <br />
                <p class="flow-text">
                    Now we will create two list, <i>X</i> and <i>Y</i>. <i>X</i> will store our sequences of characters, and <i>Y</i> will store the character that should come after each sequence,
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
                    <Gist id="516e8679f1606f96491f7f9aca48b97d" />
                </p>
                <br />
                <br />
                <p class="flow-text">
                    Now we will split our data into a training set and a validation set. We will use the training set to train our model, and the validation set to test how our
                    model performs on unseen data. 
                    <br />
                    <br />
                    {/* This paragraph is bad */}
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
                    <Gist id="f594da31b22964ec928ad272e0d2b58e" />
                </p>
                <br />
                <br />
                <p class="flow-text">
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
                    <Gist id="eea514e0563b6a7e70f5b274efe02a53" />
                </p>
                {/* Im up to training the generate sequence function */}
            </div>
        </div>
    );
};

export default RNNCharacterGeneration;