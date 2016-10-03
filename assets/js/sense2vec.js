//- ----------------------------------
//- 💥 SENSE2VEC
//- ----------------------------------

'use strict';

class sense2vec {
    constructor(api, options) {
        this.api = api;
        this.container = document.querySelector(options.container || '#sense2vec');

        this.defaultWord = options.defaultWord || 'natural language processing';
        this.defaultSense = options.defaultSense || 'auto';

        this.onStart = options.onStart || false;
        this.onSuccess = options.onSuccess || false;
        this.onError = options.onError || false;
        this.onRender = options.onRender || false;
    }

    find(word, sense) {
        if(typeof this.onStart === 'function') this.onStart();

        const query = encodeURIComponent(word) + ((sense != 'auto') ? '|' + sense : '');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.api + query, true);
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.onload = () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                if(typeof this.onSuccess === 'function') this.onSuccess();
                this.render(JSON.parse(xhr.responseText).results);
            }

            else if(xhr.status !== 200)  {
                if(typeof this.onError === 'function') this.onError(xhr.statusText);
            }
        }

        xhr.onerror = () => {
            xhr.abort();
            if(typeof this.onError === 'function') this.onError();
        }

        xhr.send(null);
    }

    render(words) {
        this.container.innerHTML = '';

        if(words.length) words.forEach(word => {
            this.container.innerHTML += this.renderWord({
                key: encodeURIComponent(word.key),
                text: word.text,
                score: Math.round(word.score * 100),
                total: word.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            });
        });

        else this.container.innerHTML = `<div class="sense2vec-result">Nothing found.</div>`;

        if(typeof this.onRender == 'function') this.onRender();
    }

    renderWord(word) {
        return `
            <div class="sense2vec-result">
                <span class="sense2vec-word js-sense2vec-word">${word.text}</span>
                <span class="sense2vec-score" data-tooltip="${word.total} total">
                    ${word.score}%
                </span>
            </div>
        `;
    }
}
