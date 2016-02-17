//TODO the file name should be named later 
Paths = {}
Paths.imagesPath = "";
Paths.materialsPath = "";

if (Meteor.isServer) {
  Paths.imagesPath = process.env.PWD + "/public/uploads/images";
  Paths.materialsPath = process.env.PWD + "/public/uploads/materials";
}

