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
    let servername = '';
    if (x.serverName) {
      servername += '//';
      servername += x.serverName;
      if (x.instanceName) {
        servername += '\\';
        servername += x.instanceName;
      }

      if (x.portNumber) {
        servername += ':';
        servername += x.portNumber;
      }
    }
    let params = '';
    if (Object.keys(valuefulParams).length > 0) {
      const regex = /(;|"|'|\s)/g;
      Object.entries(valuefulParams).forEach((entry) => {
        const key = entry[0];
        let value = entry[1];
        if (regex.test(value)) {
          value = `{${value}}`;
        }
        params += `;${key}=${value}`;
      });
    }

    return `jdbc:${this.prefix}:${servername}${params}`;
  },
};
