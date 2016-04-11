var Schemas = {};

Schemas.checklist = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
  },
  type: {
    type: String,
    label: 'type',
    allowedValues:['boolean','scale']
  },
  min: {
    type: String,
    label: 'min score',
    optional:true
  },
  max: {
    type: String,
    label: 'min score',
    optional:true
  },
});

Schemas.criteria = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
  },
  type: {
    type: String,
    label: 'type',
    allowedValues:['checklist','boolean','scale']
  },
  min: {
    type: String,
    label: 'min score',
    optional:true
  },
  max: {
    type: String,
    label: 'min score',
    optional:true
  },
  checklist: {
    type: [Schemas.checklist],
    label: 'catogory checklist',
    optional:true,
    custom: function () {
      var shouldBeRequired = this.field('type').value === 'checklist';

      if (shouldBeRequired) {
        // inserts
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return "required";
        }

        // updates
        else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return "required";
          if (this.operator === "$unset") return "required";
          if (this.operator === "$rename") return "required";
        }
      }
    }
    
  }
});

Schemas.marks = new SimpleSchema({
  score: {
    type: Number,
    label: 'score',
  },
  marks: {
    type: String,
    label: 'note',
  },
});

Schemas.individualsGrades = new SimpleSchema({
  userId: {
    type: String,
    label: 'user Id',
  },
  marks: {
    type: [Schemas.marks],
    label: 'type',
  },
});

Schemas.teamsGrades = new SimpleSchema({
  teamSlug: {
    type: String,
    label: 'team slug',
  },
  marks: {
    type: [[Schemas.marks]],
    label: 'type',
  },
});

Schemas.sprints = new SimpleSchema({
  name: {
    type: String,
    label: "sprint name"
  },
  teamsGrades: {
    type: Schemas.teamsGrades,
    label: 'teamsGrades',
  },
  individualsGrades: {
    type: Schemas.individualsGrades,
    label: 'teamsGrades',
  },
});

Schemas.GradeBook = new SimpleSchema({
  sprints: {
    type: Schemas.sprints,
  },
});

GradeBook.attachSchema(Schemas.Team);
