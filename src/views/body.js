

let React = require("react"),
  post = require("./post.js");


exports.Body = React.createClass({
  render: function () {
    let posts = [];
    for (let p of this.props.posts) {
      posts.push(<h2 key={p.id}><a href={"/posts/" + p.id}>{p.title}</a></h2>);
    }
    return <div>
      <h1>Posts</h1>
      {posts}
    </div>
  }
});


