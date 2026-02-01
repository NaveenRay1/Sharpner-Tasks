const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // STEP 1: Read the existing messages from the file
        // We use 'utf-8' so the data comes back as a readable string, not a buffer
        fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                data = 'No messages yet!'; // Fallback if file doesn't exist
            }

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');
            
            // STEP 2: Show the message at the TOP
            res.write(`<h1>Messages:</h1>`);
            res.write(`<div>${data}</div>`); 
            res.write('<hr>');

            // STEP 3: Show the form BELOW the message
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message">');
            res.write('<button type="submit">Send</button>');
            res.write('</form>');
            
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        
        // Handling the Stream (chunks of data)
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // Handling the Buffer (combining chunks)
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            // Writing to file and Redirecting (302)
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});