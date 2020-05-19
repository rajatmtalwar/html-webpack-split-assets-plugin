# html-webpack-split-assets-plugin

Webpack plugin for splitting head and body assets which are added to index.html by [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

It generates two files. By default the names are headAssets.jsp and bodyAssets.jsp. These names are configurable.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin), This plugin is an extension to html-webpack-plugin

### Installing

```

npm install html-webpack-split-assets-plugin

```

### Usage

Sample webpack config. Snippet from Create React App


```js
const HTMLWebpackSplitAssetsPlugin = require('html-webpack-split-assets-plugin');

...
plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
        new HTMLWebpackSplitAssetsPlugin(HtmlWebpackPlugin),

```

Configuring file names

```js
        new HTMLWebpackSplitAssetsPlugin(HtmlWebpackPlugin, {
            headAssets: "head.php",
            bodyAssets: "body.php"
        })
```

Sample generated files from CRA

head assets

```html
<link href="/static/css/main.5f361e03.chunk.css" rel="stylesheet">
```

body assets
```html
<script>!function(e){function r(r){for(var n,p,l=r[0],a=r[1],f=r[2],c=0,s=[];c<l.length;c++)p=l[c],Object.prototype.hasOwnProperty.call(o,p)&&o[p]&&s.push(o[p][0]),o[p]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(i&&i(r);s.length;)s.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,l=1;l<t.length;l++){var a=t[l];0!==o[a]&&(n=!1)}n&&(u.splice(r--,1),e=p(p.s=t[0]))}return e}var n={},o={1:0},u=[];function p(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.m=e,p.c=n,p.d=function(e,r,t){p.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},p.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(e,r){if(1&r&&(e=p(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(p.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)p.d(t,n,function(r){return e[r]}.bind(null,n));return t},p.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(r,"a",r),r},p.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},p.p="/";var l=this["webpackJsonpsample-app"]=this["webpackJsonpsample-app"]||[],a=l.push.bind(l);l.push=r,l=l.slice();for(var f=0;f<l.length;f++)r(l[f]);var i=a;t()}([]);
//# sourceMappingURL=runtime-main.292b361c.js.map</script><script src="/static/js/2.58760b6e.chunk.js"></script><script src="/static/js/main.4a2afb18.chunk.js"></script>
```


## Authors

- **Rajat Talwar** - _Initial work_

See also the list of [contributors](https://github.com/rajatmtalwar/html-webpack-split-assets-plugin/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
