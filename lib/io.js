var io;
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = io = {

  convertDirectory: function(dirPath, options) {
    var stat, i, directory, file;
    directory = fs.readdirSync(dirPath);

    for(i in directory) {
      file = path.join(dirPath, directory[i]);
      stat = fs.statSync(file);

      if(stat.isDirectory()) {
        io.convertDirectory(file, {output: path.join(options.output, path.basename(file))});
      } else if(path.extname(file) === '.less') {
        console.log(file, ' -> ', path.join(options.output, path.basename(file)));
      }
    }
  }

};
