import RNNTextGeneration from './text-generation-using-a-rnn/text-generation-using-a-rnn';
import DeepFakeFaceSwap from './deep-fake-face-swap-autoencoder/deep-fake-face-swap-autoencoder';
import DeployModelHeroku from './deploy-model-to-heroku-for-free/deploy-model-to-heroku-for-free';

const articleMetadata = {
    'deploy-a-model-to-heroku-for-free': {component: DeployModelHeroku(), title: 'Deploy A Model To Heroku For Free', author: 'OsbornAI', description: 'This article demonstrates how you can deploy your TensorFlow machine learning models to the cloud for free using Heroku, Flask.', keywords: 'tensorflow, heroku, model, free, flask, python, deploy', date_published: '26/01/2021'},
    'deep-fake-face-swap-autoencoder': {component: DeepFakeFaceSwap(), title: 'Deep Fake Face Swap Autoencoder', author: 'OsbornAI', description: 'This article demonstrates how an autoencoder can be used to create a deep fake that swaps the faces of an individual with another.', keywords: 'autoencoder, face swap, deep fake, tensorflow, keras, tutorial, tensorflow, python', date_published: '11/01/2021'},
    'text-generation-using-a-rnn': {component: RNNTextGeneration(), title: 'Text Generation Using A RNN', author: 'OsbornAI', description: 'This article demonstrates how a recurrent neural network can be used to generate text one character at a time.', keywords: 'rnn, tensorflow, character generation, text generation, lstm, text generator, gru, tensorflow, python', date_published: '02/01/2021'},
};

export default articleMetadata;