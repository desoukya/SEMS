//TODO the file name should be named later
Paths = {}
Paths.imagesPath = "";
Paths.materialsPath = "";
Paths.filespath = "";

if (Meteor.isServer) {
  Paths.imagesPath = "~" + "/public/.uploads/.images";
  Paths.materialsPath = "~" + "/public/.uploads/.materials";
  Paths.filespath = "~" + "/public/.uploads/.files";
}
