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
        `Server: Apache/2.2.14 (Win32)\n` +
        `Content-Length: ${body.length}\n` +
        `Connection: Closed\n` +
        `Content-Type: text/html; charset=utf-8\n`+
        `\n`+
        `${body}`);
}

function processHttpRequest(method, uri, headers, body) {
    if (method !== "POST" || uri !== "/api/checkLoginAndPassword") {
        return outputHttpResponse(404, "Not Found", headers,
            "<h1 style='color:red'>ERROR: Resource Not Found</h1>");
    }

    if (headers["Content-Type"] !== "application/x-www-form-urlencoded"){
        return outputHttpResponse(400, "Bad Request", headers,
            "<h1 style='color:red'>ERROR: Invalid Content-Type</h1>");
    }


    let userName = body.substring(body.indexOf("=") + 1, body.indexOf("&"));
    let passcode = body.substring(body.lastIndexOf("=") + 1);

    let passwordsFile;
    try {
        passwordsFile = require("fs").readFileSync("passwords.txt");
    } catch (err) {
        return outputHttpResponse(500, "Internal Server Error", headers,
            "<h1 style='color:red'>ERROR: Internal Server Error</h1>");
    }

    if (passwordsFile.includes(`${userName}:${passcode}`)) {
        outputHttpResponse(200, "OK", headers,
            "<h1 style='color:green'>FOUND</h1>")
    } else {
        outputHttpResponse(401, "Unauthorized", headers,
            "<h1 style='color:red'>ERROR: Invalid login or password</h1>");
    }
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