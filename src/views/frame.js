

let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link;


exports.Frame = React.createClass({
  render: function () {
    this.props.data = {};
    this.props.meta = {};
    if (true /* is_newpage */) {
      this.props.new_page_script = <script src="js/newframe.js"></script>
    }

    return <html>
  <head>
    <title>{this.props.data["title"] || this.props.data["location"]}</title>
    <!--METAHEAD-->
    {this.props.meta["framehead"]}
    <!--ENDHEAD-->
    <link rel="stylesheet" href="css/interface.css" />
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="js/misc/util.js"></script>
    <script src="js/misc/frame.js"></script>
    <script src="js/misc/login.js"></script>

    {this.props.new_page_script}

    <link rel="stylesheet" href="css/frame.css" />
    <link rel="stylesheet" href="css/login.css" />
    {'if data.get("favicon")'}
    <link rel="shortcut icon" href="{'data[\'favicon\']'}" />
    {'endif'}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={'data.get("title") or data.get("location")'} />
    <meta property="og:url" content={'canonical_url'} />

    {"if meta.get('snippet')"}
    <meta property="og:image" id="meta-snippet" content="{'snippet_src'}" />
    <meta property="og:image:type" content="image/png" />
    {'endif'}
    <!-- FIXME: must be a URL
    {'if data.get("screenshot")'}
    <meta property="og:image" content={"data['screenshot']"} />
    {'endif'}
    -->
  </head>
  <body>
    <div id="container">
      <div id="toolbar">
        <div id="login-widget"></div>

        <div className="instructions">
          <span id="comment-instructions">
            <span id="comment-expand-indicator">
              ▼
            </span>
            <span id="comment-collapse-indicator" stylee="display: none">
              ▲
            </span>
          </span>
        </div>

        <div id="info">
          <a className="sitelink" href={"data.get('location')"}>{"'' if link_text is None else (link_text if len(link_text) < 50 else link_text[:50] + '...')"}</a>
          <span id="clip"><img title="Copy shareable link to the clipboard"
                               src="{'base'}/clipboard-8-xl.png" stylee="height: 1em;" /></span>
          <span id="readable-toggler">
            <span id="readability-off" className={"'active' if not readable and not summarize else 'inactive'"}>normal</span>{'if data.get("readable")'}<span id="readability-on" className={"'active' if readable and not summarize else 'inactive'"}>readable</span>{'endif'}<span id="summarize-on" className={"'active' if summarize else 'inactive'"}>summarize</span>
          </span>
        </div>
  
        <div id="comment-container" stylee="display: none">
          <div id="comment">{"html(comment)"}</div>
          <div stylee="display: none" id="comment-editor-container">
            <textarea id="comment-editor"></textarea>
          </div>
  
        </div><!-- /#comment-container -->
      </div>
      <div id="frame-wrapper" className="drop-shadow">
        <iframe id="frame" height="100%" width="100%" src={"iframe_readable_src if readable else iframe_src"} data-normal-src={"iframe_src"} data-readable-src={"iframe_readable_src"}></iframe>
      </div>
    </div>
    <iframe id="summary" className="hidden no-drop-shadow" height="100%" width="100%" src={"iframe_summarize_src"} data-summarize-src={"iframe_summarize_src"}></iframe>
  </body>
</html>;

  }
});


