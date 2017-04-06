Meteor.methods({
	getGrades(teamSlug, milestone) {
		let userId = Meteor.userId();
		if(milestone) {
			let gradeSheet = Gradebook.findOne({}).sprints[milestone];
			let ret = {};

			let team = Teams.findOne({
				slug: teamSlug
			});

			ret["teamsGrades"] = {};
			ret.teamsGrades["criteria"] = gradeSheet.teamsGrades.criteria;

			ret["individualsGrades"] = {};

			// Filtering to get the grades of this team only
			ret.teamsGrades["grades"] = gradeSheet.teamsGrades.grades.filter(function(gradeArray) {
				return gradeArray.teamSlug === team.slug;
			});

			// If the user is not a student, pass him the grades of the team
			if(Roles.userIsInRole(userId, [ADMIN, LECTURER, TA, JTA])) {
				return ret;
			}

			// If not an admin and trying to get another team you should be kicked !
			if(!TeamUtils.isMember(userId, team._id))
				throw new Meteor.Error(401, "Not authorized to see that team");

			// Filtering only users' grade
			ret["individualsGrades"] = gradeSheet.individualsGrades.grades.filter(function(grade) {
				return grade.userId === userId;
			});

			return ret;
		}
	}

});
