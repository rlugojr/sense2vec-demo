<a href="https://explosion.ai"><img src="https://explosion.ai/assets/img/logo.svg" width="125" height="125" align="right" /></a>

# sense2vec: Semantic Analysis of the Reddit Hivemind

[This project](https://demos.explosion.ai/sense2vec) demonstrates a powerful and scalable approach to text mining, using our open-source library [spaCy](https://spacy.io). We used spaCy to tag and parse every comment posted to Reddit in 2015, and fed the results to Gensim's word2vec implementation. Using the search, you can get a lot of interesting insights into the Reddit hivemind. See what a syntax-sensitive distributional similarity model thinks Reddit thinks about almost anything.

## Run the demo

This demo is implemented in [Jade (aka Pug)](https://www.jade-lang.org), an extensible templating language that compiles to HTML, and is built or served by [Harp](https://harpjs.com). To serve it locally on [http://localhost:9000](http://localhost:9000), simply run:

```bash
sudo npm install --global harp
git clone https://github.com/explosion/sense2vec-demo
harp server
```

The demo is written in ECMAScript 6. For full, cross-browser compatibility, make sure to use a compiler like [Babel](https://github.com/babel/babel). For more info, see this [compatibility table](https://kangax.github.io/compat-table/es6/).

## Using  sense2vec.js

Include [`sense2vec.js`](assets/js/sense2vec.js) and initialize a new instance specifying the API and settings, then use the `find()` method.

```javascript
const demo = new sense2vec('http://localhost:8000', {
    container: '#sense2vec',
    defaultWord: 'natural language processing',
    defaultSense: 'noun'
});

demo.find('duck', 'verb');
```

Our service that produces the input data is open source, too. You can find it at [spacy-services](https://github.com/explosion/spacy-services).

The following settings are available:

| Setting | Description | Default |
| --- | --- | --- |
| **container** | element to display results in, can be any query selector | `#displacy` |
| **defaultText** | text used if sense2vec is run without text specified | `'natural language processing'` |
| **defaultModel** | model used if run without model specified | `'en'` |
| **defaultSense** | part-of-speech tag or "auto" for automatic detection | `'auto'` |
| **onStart** | function to be executed on start of server request | `false` |
| **onSuccess** | callback function to be executed on successful server response | `false` |
| **onRender** | callback function to be executed when results have rendered | `false` |
| **onError** | function to be executed if request fails | `false` |
