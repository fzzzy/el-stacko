

let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link;


exports.Frame = React.createClass({
  render: function () {
    if (this.props.data.favicon) {
      this.props.favicon = <link rel="shortcut icon" href={this.props.data.favicon} />;
    } else {
      this.props.favicon = "";
    }
    
    if (this.props.meta.snippet) {
      this.props.snippet = <div>
        <meta property="og:image" id="meta-snippet" content={this.props.snippet_src} />
        <meta property="og:image:type" content="image/png" />
      </div>;
    } else {
      this.props.snippet = "";
    }

    if (this.props.data.screenshot !== undefined) {
      // FIXME: must be a url
      this.props.screenshot = <meta property="og:image" content={this.props.data.screenshot} />

    } else {
      this.props.screenshot = "";
    }

    console.log(Object.getOwnPropertyNames(this.props.data));
    if (this.props.data.location) {
      let txt = this.props.data.location;
      if (txt.length > 50) {
        txt = txt.slice(0, 50) + '...';
      }
      this.props.link_text_short = txt;
    } else {
      this.props.link_text_short = "";
    }

    return <div id="container">
      {this.props.favicon}
      {this.props.snippet}
      {this.props.screenshot}
      <div id="toolbar">
        <a href={this.props.data.location}>
          {this.props.link_text_short}
        </a>
      </div>
      <h1>{this.props.data.title || this.props.data.location}</h1>

      <iframe width="100%" id="frame" src={"/content/" + this.props.identifier} />
    </div>
  }
});



