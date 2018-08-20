// Include React as a dependency
var React = require("react");

// Query Component Declaration
var Query = React.createClass({

  // Initial variables for the component set to be blank
  getInitialState: function() {
    return {
      search: "",
      start: "",
      end: ""
    };
  },

  // Detect ANY change in the textbox and register it
  handleChange: function(event) {
    console.log("TEXT CHANGED");

    // Capture any change in text to query terms (pre-search).
    // For future reference - refer to this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // This code handles the sending of the search terms to the parent Search component
  handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED");
    this.props.updateSearch(this.state.search, this.state.start, this.state.end);
  },

  // Here we render the Query component
  render: function() {

    return (
      <div className="main-container">

        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-newspaper-o" aria-hidden="true"></i> Query
                  </strong>
                </h1>
              </div>
              <div className="panel-body">

                {/* This associates the text-box inputs with the state values */}
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <h4 className=""><strong>Topic</strong></h4>
                    <input
                      type="text"
                      value={this.state.search}
                      className="form-control"
                      id="search"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>Start Year</strong></h4>
                    <input
                      type="number"
                      value={this.state.start}
                      className="form-control"
                      id="start"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>End Year</strong></h4>

                    <input
                      type="number"
                      value={this.state.end}
                      className="form-control"
                      id="end"
                      onChange={this.handleChange}
                      required
                    />

                  </div>

                  {/* onClick event that triggers the HandleSubmit */}
                  <div className="pull-right">
                    <button
                      type="submit"
                      className="btn btn-danger"
                    >
                      <h4>Submit</h4>
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Query;
