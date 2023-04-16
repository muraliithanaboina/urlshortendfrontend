module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://music.com',
      changeOrigin: true,
      secure: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Headers': 'content-type'
      }
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8082', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
