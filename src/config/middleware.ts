/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 15:16:37
 */
export default {
    list: [
        'StaticMiddleware',
        'TypeormMiddleware'
    ], //加载的中间件列表
    config: { //中间件配置
        // 静态资源中间件默认未开启
        StaticMiddleware: false,
        // 需要开启请修改为:
        // StaticMiddleware: {
        //     cache: true
        // },
        TypeormMiddleware: {
            'type': 'mysql', //mysql, mariadb, postgres, sqlite, mssql, oracle, mongodb, cordova
            'host': 'localhost',
            'port': 3306,
            'username': 'test',
            'password': 'test',
            'database': 'test',
            'synchronize': false, //true 每次运行应用程序时实体都将与数据库同步
            'logging': true,
            'entities': [`${ process.env.APP_PATH } /model/*`]
        }
    }
};