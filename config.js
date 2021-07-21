const config = {
    db: {
      user: 'postgres',
      password: 'changeme',
      host: '0.0.0.0',
      port: '1111',
      database: 'postgres'
    },
    tables:{
        tree: 'anthologyTree',
        branch: 'branch',
        urllist: 'urlList'
    }
};

module.exports = config;
