
let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link;


exports.Post = React.createClass({
  render: function () {
    let taglist = this.props.tags.split().map((t) => <Link to="tag" query={{name: t}} key={t}>{t}</Link>);
    return <div>
      <h1>{this.props.title}</h1>
      <p>{this.props.body}</p>
      <div>
        <h2>Tags</h2>
        {taglist}
      </div>
    </div>;
  }
});


