import http from 'http';
import { createHandler } from 'graphql-http/lib/use/http';
import { schema } from './schema.js';

// Create the GraphQL over HTTP Node request handler
const handler = createHandler({ schema });

// Create a HTTP server using the listener on `/graphql`
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/graphql')) {
        handler(req, res);
    } else {
        res.writeHead(404).end();
    }
});

server.listen(4000);
console.log('Listening to port 4000');