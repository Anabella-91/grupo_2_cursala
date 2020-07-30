const axios = require('axios');
const defaults = require('./default');

const url = 'list/';

const productRequest = {
    getProducts: function(){
        return axios({
            ...defaults,
            method: 'GET',
            url: `${url}`
        });
    },
    search: query => {

    },
    getById: id => {

    }
};

module.exports = productRequest;