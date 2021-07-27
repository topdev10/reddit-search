const fetch = require('cross-fetch');

const getResults = (searchVal) => {
    return new Promise((resolve) => {
        fetch(`https://www.reddit.com/search.json?q=${searchVal}&sort=new`)
        .then((res) => res.json())
        .then(res => {
            resolve(res);
        }, (err) => {
            console.error(`Error while fetching data from Reddit: ${JSON.stringify(err)}`);
            resolve([]);
        })
    });
}

module.exports = {
    getResults
}