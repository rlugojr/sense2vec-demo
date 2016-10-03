//- ----------------------------------
//- 💥 SENSE2VEC DEMO
//- ----------------------------------

'use strict';

{
    const defaultWord = 'natural language processing';
    const defaultSense = 'auto';

    const loading = () => document.body.classList.toggle('loading');
    const onError = (err) => $('#error').style.display = 'block';
    const onRender = () => [...$$('.js-sense2vec-word')].forEach(word => word.addEventListener('click', ev => run(word.textContent)));

    const sense2vecDemo = new sense2vec(api, {
        container: '#sense2vec',
        defaultWord: defaultWord,
        defaultSense: defaultSense,
        onStart: loading,
        onSuccess: loading,
        onRender: onRender,
        onError: onError
    });


    // UI

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);


    // First Run

    document.addEventListener('DOMContentLoaded', () => {
        const query = window.location.search.substring(1);
        const params = query.split('|').map(param => param.replace('_', ' '));

        const word = decodeURIComponent(getQueryVar('word') || params[0] || defaultWord);
        const sense = getQueryVar('sense') || params[1] || defaultSense;

        if(params) updateURL(word, sense);
        updateView(word, sense);
        sense2vecDemo.find(word, sense);
    });


    // Run Demo

    const run = (
        word = $('#input').value || defaultWord,
        sense = $('[name="sense"]:checked').value || defaultSense ) => {
            sense2vecDemo.find(word, sense);
            updateView(word, sense);
            updateURL(word, sense);
    }


    // UI Event Listeners

    $('#submit').addEventListener('click', ev => run());
    $('#input').addEventListener('keydown', ev => (ev.keyCode == 13) && run());


    // Update View

     const updateView = (word, sense) => {
        $('#input').value = word;
        $(`[value="${sense}"]`).checked = true;
        window.scrollTo(0, 0);
    }


    // Update URL

    const updateURL = (word, sense) => {
        const params = { word, sense };
        const url = Object.keys(params).map(param => `${param}=${encodeURIComponent(params[param])}`);
        history.pushState(params, null, '?' + url.join('&'));
    }


    // Get URL Query Variables

    const getQueryVar = (key) => {
       const query = window.location.search.substring(1);
       const params = query.split('&').map(param => param.split('='));

       for(let param of params) if(param[0] == key) return param[1];
       return false;
    }
}
