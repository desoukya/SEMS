var Schemas = {};

Schemas.GitAuth = new SimpleSchema({
  accessToken: {
    type: String
  }

});

GitAuth.attachSchema(Schemas.GitAuth);
