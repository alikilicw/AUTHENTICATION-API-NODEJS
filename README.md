# AUTHENTICATION-API-NODEJS
  It is a highly useful Node.js authentication API. Express.js was used as the web API framework, JWT for token handling responsible for security, and JOI for validation processes. It hashes password when storing into db.

DATABASE = MONGODB

Expecting .env values:
  1. PORT = 5000
  2. DB_URL = mongodb+srv://<username>:<password>@<DB-Instance>.b9m6yax.mongodb.net/<DB-Name>?retryWrites=true&w=majority
  3. EMAIL_USER = abcd@xxx.com
  4. EMAIL_PASSWORD = xxxxx
  5. JWT_SECRET_KEY = randomvalues
