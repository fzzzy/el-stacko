

let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link;


exports.Content = React.createClass({
  render: function () {
    
    return <div>
      <div dangerouslySetInnerHTML={{__html: this.props.data.head}}>
      </div>
      <div id="container" dangerouslySetInnerHTML={{__html: this.props.data.body}}>
      </div>
    </div>
  }
});



