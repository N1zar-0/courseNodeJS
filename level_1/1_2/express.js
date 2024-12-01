const app = require('express')();
const port = 3000;

const urls = {};

app.get('*', (req, res) => {
    const url = req.originalUrl;

    if (!(url in urls))
        urls[url] = 0;

    res.send(`${urls[url]++}`);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});