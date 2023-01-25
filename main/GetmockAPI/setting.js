const config = {
    user: 'GetMock_Adi', //sql user
    password: 'sayuri_test@123#', //sql password
    server: '184.154.187.166', //sql server name
    database: 'GetMockTest_DB', //database name
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
    },
    // port: 1433
  }
  module.exports = config;

//   const connectionString = "Data Source=184.154.187.166,1433;Initial Catalog=GetMockTest_DB;User ID=GetMock_Adi;Password=sayuri_test@123#" 
