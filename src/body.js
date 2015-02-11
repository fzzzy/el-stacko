

let React = require("react");

exports.body = React.createClass({
  render: function () {
    return <h1>
      {this.props.greeting}
    </h1>;
  }
});


