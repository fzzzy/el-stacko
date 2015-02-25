
let React = require("react");


exports.Post = React.createClass({
  render: function () {
    return <div>
      <h1>{this.props.title}</h1>
      <p>{this.props.body}</p>
      <span>{this.props.tags}</span>
    </div>;
  }
});


