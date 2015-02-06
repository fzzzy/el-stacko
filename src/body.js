

let React = require("react");

exports.MainBody = React.createClass({
  render: function () {
    return <h1>
      {this.props.greeting}
    </h1>;
  }
});


