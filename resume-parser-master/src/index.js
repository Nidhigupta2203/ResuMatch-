const parseIt = require("./utils/parseIt");

/* Parse Resume from File */
const parseResumeFile = (inputFile, outputDir) => {
  return new Promise((resolve, reject) => {
    parseIt.parseResumeFile(inputFile, outputDir, (file, error) => {
      if (error) return reject(error);
      resolve(file);
    });
  });
};

/* Parse Resume from URL */
const parseResumeUrl = (url) => {
  return new Promise((resolve, reject) => {
    parseIt.parseResumeUrl(url, (file, error) => {
      if (error) return reject(error);
      resolve(file);
    });
  });
};

module.exports = {
  parseResumeFile,
  parseResumeUrl,
};
