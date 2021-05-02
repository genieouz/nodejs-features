var fs = require("fs");
exports.copy = (path) => {
    console.log("Copy in progress.... ", path);
    fs.readFile(path, (error, file) => {
        if(error) throw error
        fs.writeFile("myfile-copy.mp3", file, (err, file) => {
            if (err) throw err
            console.log("Copy completed!");
        });
    });
}

exports.copyWithStream = (path) => {
    console.log("Copy in progress.... ", path);
    fs.stat(path, (err, stat) => {
        if(err) throw err
        const fileSize = stat.size;
        let bytesRead = 0;
        const read = fs.createReadStream(path);
        const write = fs.createWriteStream("myfile-copie.mp4");
        read.on("data", chunk => {
            bytesRead += chunk.length;
            console.log(`progress: ${((bytesRead/fileSize)*100).toFixed(2)}%`);
        });
        read.pipe(write);
        read.on("end", () => {
            console.log("Copy completed!");
        });
    })
}
