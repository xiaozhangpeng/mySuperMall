module.exports={
    //关闭Eslint
    lintOnSave:false,
    configureWebpack:{
        resolve:{
            alias:{
                "assets":'@/assets',
                "common":'src/common',
                "network":'src/network',
                "components":'@/components',

            }
        }
    }
}
// module.exports = {
//     chainWebpack:(config) => {
//         config.resolve.alias
//             .set('@', resolve('./src'))
//             .set('assets', resolve('./src/assets'))
//             .set('common', resolve('./src/common'))
//             .set('components', resolve('./src/components'))
//             .set('network', resolve('./src/network'))
//             .set('views', resolve('./src/views'))
//     }
// }
