const { convertFileNameWithPdfExt } = require("./convertFileNameWithPdfExt");
const { convertFileNameWithWebpExt } = require("./convertFileNameWithWebpExt");
const { convertImgArrayToObject } = require("./convertImgArrayToObject");
const { uploadWorker } = require("./uploadWorker");
const { isMainThread } = require("worker_threads");

const ImgUploader = async (files) => {
  let image = {};

  // Handle case where no files are provided
  if (!files || !Array.isArray(files) || files.length === 0) {
    return image;
  }

  if (!isMainThread) {
    throw new Error("ImgUploader must run on main thread");
  }

  try {
    const imgFile = files.map(
      ({ buffer, originalname, fieldname, mimetype }) => ({
        buffer,
        originalname:
          mimetype === "application/pdf"
            ? convertFileNameWithPdfExt(originalname)
            : convertFileNameWithWebpExt(originalname),
        fieldname,
        mimetype,
      })
    );

    for (let file of imgFile) {
      try {
        await uploadWorker(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
      }
    }

    image = convertImgArrayToObject(imgFile);
  } catch (error) {
    console.error("ImgUploader error:", error.message);
    throw error;
  }

  return image;
}

module.exports = ImgUploader;