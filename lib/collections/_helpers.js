//TODO the file name should be named later 
Paths = {}
Paths.imagesPath = "";
Paths.materialsPath = "";
Paths.filesPath = "";

if (Meteor.isServer) {
  Paths.imagesPath = process.env.PWD + "/public/uploads/images";
  Paths.materialsPath = process.env.PWD + "/public/uploads/materials";
  Paths.filesPath = process.env.PWD + "/public/uploads/files";
}

