

let React = require("react");

exports.Another = React.createClass({
  render: function () {
    return <div>
      <h1>
        what up?
      </h1>
      <h2>
        {this.props.greeting}
      </h2>
    </div>;
  }
});


