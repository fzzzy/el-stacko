

let React = require("react"),
  request = require("superagent");

exports.NewPost = React.createClass({
  handleSubmit: function(e) {
    let title = this.refs.title.getDOMNode(),
      body = this.refs.title.getDOMNode(),
      tags = this.refs.tags.getDOMNode();

    e.preventDefault();
    let r = request.put('/models/newpost');
    r.send({title: title.value, body: body.value, tags: tags.value});
    r.end(function(res) {
      window.location = "/"
    });
  },

  render: function () {
    return <form className="new-post" onSubmit={this.handleSubmit}>
      <h1>New Post</h1>
      <h2>Title</h2>
      <input ref="title" />
      <h2>Body</h2>
      <textarea ref="body" />
      <h2>Tags</h2>
      <input ref="tags" />
      <button>create post</button>      
    </form>;
  }
});


