const { upload } = require("../../config/cloudinaryConfig");
const deleteImage = require("./main/deleteImage");
const deleteProject = require("./main/deleteProject");
const getProject = require("./main/getProject");
const getProjects = require("./main/getProjects");
const updateDesignImage = require("./main/updateDesignImage");
const updateProject = require("./main/updateProject");
const uploadDesignImages = require("./main/uploadDesignImages");

const projectCtrl = [
  { action: getProjects, mid: null, url: "", method: "get" },
  {
    action: uploadDesignImages,
    mid: [upload.array("files")],
    url: "/upload-designs/:id",
    method: "post",
  },
  {
    action: updateDesignImage,
    mid: [upload.single("file")],
    url: "/update-design/:id",
    method: "put",
  },
  {
    action: deleteImage,
    mid: null,
    url: "/delete-design/:id",
    method: "delete",
  },
  { action: deleteProject, mid: null, url: "/:id", method: "delete" },
  { action: getProject, mid: null, url: "/:id", method: "get" },
  { action: updateProject, mid: null, url: "/:id", method: "put" },
];
module.exports = projectCtrl;
