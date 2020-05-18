class HTMLWebpackSplitAssetsPlugin {
  constructor(htmlWebpackPlugin, assetFiles) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.assetFiles = {
      headAssets: assetFiles.headAssets || "headAssets.jsp",
      bodyAssets: assetFiles.bodyAssets || "bodyAssets.jsp",
    };
  }

  // Ported from htmlWebpackPlugin
  static htmlTagObjectToString(tagDefinition, xhtml) {
    const attributes = Object.keys(tagDefinition.attributes || {})
      .filter(function (attributeName) {
        return tagDefinition.attributes[attributeName] !== false;
      })
      .map(function (attributeName) {
        if (tagDefinition.attributes[attributeName] === true) {
          return xhtml ? `${attributeName}="${attributeName}"` : attributeName;
        }
        return `${attributeName}="${tagDefinition.attributes[attributeName]}"`;
      });
    return `<${[tagDefinition.tagName].concat(attributes).join(" ")}${
      tagDefinition.voidTag && xhtml ? "/" : ""
    }>${tagDefinition.innerHTML || ""}${
      tagDefinition.voidTag ? "" : `</${tagDefinition.tagName}>`
    }`;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "HTMLWebpackSplitAssetsPlugin",
      (compilation) => {
        const hooks = this.htmlWebpackPlugin.getHooks(compilation);

        hooks.alterAssetTagGroups.tap("InlineChunkHtmlPlugin", (assets) => {
          let headerAssestsHTML = "";
          let bodyAssestsHTML = "";

          assets.headTags.forEach((tagObject) => {
            headerAssestsHTML += HTMLWebpackSplitAssetsPlugin.htmlTagObjectToString(
              tagObject
            );
          });
          assets.bodyTags.forEach((tagObject) => {
            bodyAssestsHTML += HTMLWebpackSplitAssetsPlugin.htmlTagObjectToString(
              tagObject
            );
          });
          compilation.emitAsset(this.assetFiles.headAssets, {
            source: () => headerAssestsHTML,
            size: () => headerAssestsHTML.length,
          });

          compilation.emitAsset(this.assetFiles.bodyAssets, {
            source: () => bodyAssestsHTML,
            size: () => bodyAssestsHTML.length,
          });
        });
      }
    );
  }
}

module.exports = HTMLWebpackSplitAssetsPlugin;
