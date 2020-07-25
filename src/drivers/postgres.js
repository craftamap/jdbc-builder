export default {
  name: 'postgres',
  description: 'PostgreSQL JDBC',
  prefix: 'postgres',
  segments: {
    host: 'hostname',
    port: 'port',
    database: 'text',
    params: {
      username: 'text',
      password: 'text',
      ssl: 'boolean',
    },
  },
  urlbuilder(x) {
    const filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        /* eslint-disable-next-line */
        .reduce((res, key) => (res[key] = obj[key], res), {}
        );

    const valuefulParams = (!!x.params && filter(x.params, value => !!value)) || {};
    let host = '';
    if (x.host) {
      host += '//';
      host += x.host;
      if (x.port) {
        host += ':';
        host += x.port;
      }
    }
    if (x.host || (!x.host && !x.database)) {
      host += '/';
    }
    let database = '';
    if (x.database) {
      database = x.database;
    }
    let params = '';
    if (Object.keys(valuefulParams).length > 0) {
      params += '?';
      const urlSearchParams = new URLSearchParams(valuefulParams);
      params += urlSearchParams.toString();
    }

    return `jdbc:${this.prefix}:${host}${database}${params}`;
  },
};
