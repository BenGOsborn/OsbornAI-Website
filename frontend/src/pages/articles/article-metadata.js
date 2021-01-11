import RNNTextGeneration from './text-generation-using-a-rnn/text-generation-using-a-rnn';
import DeepFakeFaceSwap from './deep-fake-face-swap-autoencoder/deep-fake-face-swap-autoencoder';

const articleMetadata = {
    'text-generation-using-a-rnn': {'component': RNNTextGeneration(), 'title': 'Text Generation Using A RNN', 'author': 'OsbornAI', 'description': 'This article demonstrates how a recurrent neural network can be used to generate text one character at a time.', 'keywords': 'rnn, character generation, text generation, lstm, text generator, gru', 'date_published': '02/01/2021'},
    'deep-fake-face-swap-autoencoder': {'component': DeepFakeFaceSwap(), 'title': 'Deep Fake Face Swap Autoencoder', 'author': 'OsbornAI', 'description': '', 'keywords': '', 'date_published': '11/01/2021'},
};

export default articleMetadata;