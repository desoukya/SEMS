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
  note: {
    type: String,
    label: 'note',
    optional: true
  },
});

Schemas.individualsMarks = new SimpleSchema({
  userId: {
    type: String,
    label: 'user Id',
  },
  marks: {
    type: [Schemas.marks],
    label: 'type',
  },
});

Schemas.teamsMarks = new SimpleSchema({
  teamSlug: {
    type: String,
    label: 'team slug',
  },
  marks: {
    type: [Schemas.marks],
    label: 'type',
  },
});

Schemas.individualsGrades = new SimpleSchema({
  criteria: {
    type: [Schemas.criteria],
    label: 'criteria',
  },
  grades: {
    type: [Schemas.individualsMarks],
    label: 'team marks',
  },
});

Schemas.teamsGrades = new SimpleSchema({
  criteria: {
    type: [Schemas.criteria],
    label: 'criteria',
  },
  grades: {
    type: [Schemas.teamsMarks],
    label: 'team marks',
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

Schemas.Gradebook = new SimpleSchema({
  sprints: {
    type: [Schemas.sprints],
  },
});

Gradebook.attachSchema(Schemas.Gradebook);
