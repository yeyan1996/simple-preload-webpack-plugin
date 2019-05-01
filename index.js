const defaultOptions = {
    prefix: /preload/g,
    type: "image"
}

class SimplePreloadWebpackPlugin {
    constructor(options) {
        this.options = {
            ...defaultOptions,
            ...options,
        }
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("SimplePreloadWebpackPlugin", (compilation, callback) => {

            let key = Object.keys(compilation.assets).filter(key => /\.html/.test(key))[0]
            let html = compilation.assets[key].source()

            let regExp = /<link[^>]*>/g
            let index = 0
            do {
                index = regExp.lastIndex
                regExp.exec(html)
            } while (regExp.lastIndex)
            let leftHtml = html.slice(0, index)
            let rightHtml = html.slice(index)

            let preloadAssets = Object
                .keys(compilation.assets)
                .filter(assetPath => this.options.prefix.test(assetPath))
                .map(assetPath => `<link rel=preload href=${assetPath} as=${this.options.type}>`)


            compilation.assets[key] = {
                ...compilation.assets[key],
                source() {
                    return leftHtml + preloadAssets.toString() + rightHtml
                }
            }
            callback()
        })
    }
}

module.exports = SimplePreloadWebpackPlugin
