

let React = require("react"),
  post = require("./post.js");


exports.Body = React.createClass({
  render: function () {
    let posts = [];
    for (let p of this.props.posts) {
      posts.push(<post.Post key={p.id} {...p} />);
    }
    return <span>
      {posts}
    </span>
  }
});


