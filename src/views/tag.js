
let React = require("react");


exports.Tag = React.createClass({
  render: function () {
    let posts = [];
    for (let p of this.props.posts) {
      posts.push(<h2 key={p.id}><a href={"/post/" + p.id}>{p.title}</a></h2>);
    }

    return <div>
      <h1>Tag {this.props.tag}</h1>
      {posts}
    </div>;
  }
});


