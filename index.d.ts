declare module "simple-preload-webpack-plugin" {
    export class SimplePreloadWebpackPlugin {
         constructor(options:{
             prefix?:RegExp,
             as?:string,
             rel?:"preload" | "prefetch"
         })
     }
}


