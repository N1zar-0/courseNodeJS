function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try {
            fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
        } catch (e) {
            break; /* windows */
        }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();


function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n` +
        `Date: ${new Date()}\n` +
        `Server: Apache/2.2.14 (Win32)\n` +
        `Content-Length: ${body.length}\n` +
        `Connection: Closed\n` +
        `Content-Type: text/html; charset=utf-8\n`+
        `\n`+
        `${body}`);
}

function processHttpRequest(method, uri, headers, body) {
    let statusCode = (method === "GET" && /^(\/sum\?nums=)/.test(uri)) ? 200 :
        (/^(\/sum)/.test(uri)) ? 400 : 404;

    let statusMessage;
    switch (statusCode) {
        case 200:
            statusMessage = "OK";
            break;
        case 400:
            statusMessage = "Bad Request"
            break;
        case 404:
            statusMessage = "Not Found";
            break;
    }

    let sum = "not found"
    if (statusCode !== 404)
        sum = uri.split(/[,=m]/g).filter(el => /\d+/.test(el)).reduce((a, b) => +a + +b, 0);

    outputHttpResponse(statusCode, statusMessage, headers, sum);
}


function parseTcpStringAsHttpRequest(string) {
    string = string.split("\n").filter(str => str !== "");

    let [method, uri] = string.shift().split(" ");
    let body = string.at(-1).includes(":") ? "" : string.pop();

    let headers = string.reduce((a, b) => {
        b = b.split(": ");
        a[b[0]] = b[1];

        return a;
    }, {});

    return {method, uri, headers, body};
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);