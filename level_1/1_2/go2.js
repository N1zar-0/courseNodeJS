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

function parseTcpStringAsHttpRequest(string) {
    string = string.split("\n").filter(str => str !== "");

    let [method, uri] = string.shift().split(" ");
    let body = string.at(-1).includes(":") ? "" : string.pop();

    let headers = string.reduce((a, b) => {
        b = b.split(": ");
        a[b[0]] = b[1];

        return a;
    }, {});

    return {method, uri, headers, body,};
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));