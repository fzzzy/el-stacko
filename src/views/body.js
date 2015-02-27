

let React = require("react"),
  Router = require("react-router"),
  post = require("./post.js"),
  Link = Router.Link;


exports.Body = React.createClass({
  render: function () {
    let posts = [];
    for (let p of this.props.posts) {
      posts.push(<h2 key={p.id}><Link to="post" params={{postId: p.id}}>{p.title}</Link ></h2>);
    }
    return <div>
      <h1>Posts</h1>
      {posts}
    </div>
  }
});


