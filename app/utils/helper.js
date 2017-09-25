// Include the axios package for performing HTTP requests (promise based alternative to request)
const axios = require("axios");

// SETUP VARIABLES
// =========================================
let APIKey = "9d4a8986921972b65754ea0809d47c84:12:74623931";

let helper = {
    runQuery: function(topic, startYear, endYear) {
        // URL Base
        let queryUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
        //Use axios to request data from queryUrl
        return axios.get(queryUrl)
            .then(function(response) {
                //Set up varible array for new results, full results and a counter for limiting result amount later
                let newResults = [];
                let fullResults = response.data.response.docs
                let counter = 0;

                //Show first 5 articles retrieved
                for (var i=0; i<fullResults.length; i++) {
                    //if counter is greater than 4, return new results, full results must have all info before pushing
                    if (counter > 4) {
                        return newResults;
                    } if (fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
                        newResults.push(fullResults[counter]);
                        counter++;
                    }
                }
                return newResults;
            })
    },
    //Post saved articles to database
    postArticle: function(title, date, url) {
        axios.post('api/saved', {
            title: title,
            date: date,
            url: url
        })
        .then (function(results) {
            console.log("Results posted to database");
            return(results);
        })
    }
}
//Export helper function
module.exports = helper;

