/*
 * Library for all Logging activity
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');


// Container for module (to be exported)
var loggerLib = {};


// Base directory for all Log data
loggerLib.baseDir = path.join(__dirname,'/../logging/logs');


// Write new file
loggerLib.writeNewFile = function(fileDir, writeData){
      fs.writeFile(fileDir, writeData,
       function(error){
      if (error){
            console.log("Creation of Log File Operation Failed" + error)
            } else  {
              console.log(`Write to New Log File + ${fileDir}  Successful`)
            }
        }
    )
}

loggerLib.updateFile = function(fileDir, writeData){
  fs.appendFile(fileDir, writeData,
   function(error){
  if (error){
        console.log(`Update of Log File + ${fileDir} Failed`)
        } else {
          console.log(`Update of Log File + ${fileDir} was Successful`)
            }
        }
    )
}


loggerLib.listLogs = (includeCompressedLogs, callback) => {
    fs.access(baseDir + "/logging/" + "/logs", fs.constants.F_OK, function(err, data){
      if(!err && data && data.length > 0){
        var trimmedFileNames = [];
        data.forEach(function(fileName){
  
          // Add the .log files
          if(fileName.indexOf('.log') > -1){
            trimmedFileNames.push(fileName.replace('.log',''));
          }
          // Add the .gz files
          if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
            trimmedFileNames.push(fileName.replace('.gz.b64',''));
          }
        });
        callback(false,trimmedFileNames);
      } else {
        callback(err,data);
        }

     })
  }



// Compress the contents of one .log file into a .gz.b64 file within the same directory
loggerLib.compress = function(logId,newFileId,callback){
  var sourceFile = logId+'.log';
  var destFile = newFileId+'.gz.b64';

  // Read the source file
  fs.readFile(loggerLib.baseDir+sourceFile, 'utf8', function(err,inputString){
    if(!err && inputString){
      // Compress the data using gzip
      zlib.gzip(inputString,function(err,buffer){
        if(!err && buffer){
          // Send the data to the destination file
          fs.open(loggerLib.baseDir+destFile, 'wx', function(err, fileDescriptor){
            if(!err && fileDescriptor){
              // Write to the destination file
              fs.writeFile(fileDescriptor, buffer.toString('base64'),function(err){
                if(!err){
                  // Close the destination file
                  fs.close(fileDescriptor,function(err){
                    if(!err){
                      callback(false);
                    } else {
                      callback(err);
                    }
                  });
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });

    } else {
      callback(err);
    }
  });
};


// List all the logs, and optionally include the compressed logs
loggerLib.list = function(includeCompressedLogs,callback){
  fs.readdir(loggerLib.baseDir, function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){

        // Add the .log files
        if(fileName.indexOf('.log') > -1){
          trimmedFileNames.push(fileName.replace('.log',''));
        }
        // Add the .gz files
        if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
          trimmedFileNames.push(fileName.replace('.gz.b64',''));
        }

      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};


// Decompress the contents of a .gz file into a string variable
loggerLib.decompress = function(fileId,callback){
  var fileName = fileId+'.gz.b64';
  fs.readFile(loggerLib.baseDir+fileName, 'utf8', function(err,str){
    if(!err && str){
      // Inflate the data
      var inputBuffer = Buffer.from(str, 'base64');
      zlib.unzip(inputBuffer,function(err,outputBuffer){
        if(!err && outputBuffer){
          // Callback
          var str = outputBuffer.toString();
          callback(false,str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

// Truncate a log file
loggerLib.truncate = function(logId,callback){
  fs.truncate(loggerLib.baseDir+logId+'.log', 0, function(err){
    if(!err){
      callback(false);
    } else {
      callback(err);
    }
  });
};

// Export the module
module.exports = {
  loggerLib: loggerLib
};