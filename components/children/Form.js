//React dependency
const React = require("react");

//Form component
const Form = React.createClass({
    //initial state with form
    getInitialState: function() {
        return {
            topic: "",
            startYear: "",
            endYear: ""
        }
    },
    //event function for user input
    handleChange: function(event) {
        //change state for user input
        let newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);    
    },
    //click handler for when user input
    handleClick: function() {
        //update parent with input from new search input as state
        this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
    },
    //render function
    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2 className="panel-title text-center"><strong>Search</strong></h2>
                </div>
            <div className="panel-body text-center">
                <form>
                    <div className="form-group">
                        <h4 className=""><strong>Topic</strong></h4>
                        <input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
                        <br />

                        <h4 className=""><strong>Start Year</strong></h4>
                        <input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
                        <br />

                        <h4 className=""><strong>End Year</strong></h4>
                        <input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
                        <br />
                        
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
});

// Export the component back for use in other files
module.exports = Form;