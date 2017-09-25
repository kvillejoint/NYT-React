//Dependencies
const axios = require("axios");
//Include React
const React = require("react");
const ReactDOM = require("react-dom");
const ReactApp = require("create-react-app");

// Here we include all of the sub-components
const Form = require("./children/Form");
const Saved = require("./children/Saved");
const Search = require("./children/Search");

// Helper for making AJAX requests to our API
const helpers = require("./utils/helpers");

//Create Main component
let Main = React.createClass({
    //set initial state
    getInitialState: function() {
        return {
            topic: "",
            startYear: "",
            endYear: "",
            results:[],
            savedArticles: []
        }
    },
    //Functions for children to update parent file
    setTerm: function(topic, startYear, endYear) {
        this.setState({
            topic: topic,
            startYear: startYear,
            endYear: endYear
        })
    },
    getArticle: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

    saveArticle: function(title, date, url) {
        helpers.postArticle(title, date, url);
        this.getArticle();
    },

    deleteArticle: function(article){
		console.log(article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));
		this.getArticle();
	},
    //Code to reun when component changes
    //when component updates this code will run
    componentDidUpdate: function(priorProps, priorState) {
        if(priorState.topic != this.state.topic) {
            console.log("Component has updated");
            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
                .then(function(data) {
                    console.log(data);
                    if (data != this.state.results)
                        {
                            this.setState({
                                results: data
                            })
                        }
                }.bind(this))
        }
    },

    //when component mounts this code will run
    componentDidMount: function() {
        axios.get("/api/saved")
            .then(function(response) {
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },
    //render the function
    render: function() {
        return(
            //html for website rendering
            <div className="container">        
                            <div className="row">
                                <div className="jumbotron" style={{'backgroundImage': 'url(./assets/images/newspaper.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>
                                    <h2 className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '54px'}}>New York Times Article Search</h2>
                                    <p className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '24px'}}>Search and save articles of interest!</p>
                                </div>
                            </div>

                            <div className="row">
                                <Form setTerm={this.setTerm}/>
                            </div>
            
                            <div className="row">                      
                                <Results results={this.state.results} saveArticle={this.saveArticle}/>
                            </div>
            
                            <div className="row">
                                <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
                            </div>
                        </div>
        )
    }
    
});

module.exports = Main;