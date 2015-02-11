

let React = require("react");

exports.Another = React.createClass({
  render: function () {
    return <h1>
      {this.props.greeting}, what up
    </h1>;
  }
});


