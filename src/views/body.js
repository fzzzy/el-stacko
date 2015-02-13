

let React = require("react");

exports.Body = React.createClass({
  render: function () {
    return <h1>
      {this.props.body}
    </h1>;
  }
});


