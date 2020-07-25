export default {
  name: 'sqlserver',
  description: 'Microsoft SQL Server JDBC',
  prefix: 'sqlserver',
  segments: {
    serverName: 'hostname',
    instanceName: 'hostname',
    portNumber: 'port',
    property: {
      databaseName: 'text',
      user: 'text',
      password: 'text',
    },
  },
  urlbuilder(x) {
    const filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        /* eslint-disable-next-line */
        .reduce((res, key) => (res[key] = obj[key], res), {}
        );

    const valuefulParams = (!!x.property && filter(x.property, value => !!value)) || {};
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
    let params = '';
    if (Object.keys(valuefulParams).length > 0) {
      Object.entries(valuefulParams).forEach((entry) => {
        const [key, value] = entry;
        params += `;${key}=${value}`;
      });
    }

    return `jdbc:${this.prefix}:${host}${params}`;
  },
};
