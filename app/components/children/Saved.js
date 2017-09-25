// Include React
const React = require("react");

// Creating the Saved component to display Saved articles
const Saved = React.createClass({
    getInitialState: function () {
        return {
            savedArticles: []
        }
    },

    clickToDelete: function(result) {
        this.props.deleteArticle(result);
    },
    //Review component receiving props
    componentWillReceiveProps: function(newProps) {
        //create alias variable for this to use it in new function
        let that= this;
        console.log(newProps);
        let myResults = nextProps.savedArticles.map(function(search, i) {
			var boundClick = that.clickToDelete.bind(that, search);
            return  <div className="list-group-item" key={i}>
                        <a href={search.url} target="_blank">{search.title}</a>
                        <br />
                        {search.date}
                        <br />
                        <button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Delete</button>
                    </div>
        });
		this.setState({savedArticles: myResults});
    },

    render: function() {
        return(
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
                </div>
                <div className="panel-body">

                    {/* Use of map function to loop through an array in JSX*/}
                    {this.state.savedArticles}
                </div>
            </div>
        )
    }
});

// Export the component for use in other files
module.exports = Saved;