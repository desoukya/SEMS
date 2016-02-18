var allMaterials = [{
  title: "Lecture 1",
  link: "https://docs.google.com/presentation/d/1eAEpBXXCG2iOu53wt23iWMqQIGYpGxrThRJiesskTdk/edit?usp=sharing",
  type: "Lecture",
  week: 1,
  date: "18-Feb-2016",
  description: "no description"
}, {
  title: "Lecture 2",
  link: "https://docs.google.com/presentation/d/1esCOJhl5xFaV_IaQ4PHNjUa2e8oI0551DRP-_RUGe6Q/edit?usp=sharing",
  type: "Lecture",
  week: 2,
  date: "18-Feb-2016",
  description: "no description"
}, {
  title: "Lecture 3",
  link: "https://docs.google.com/presentation/d/1PB05Hfx27uoJaw5jmnazSqz0ms6LSv0TbdHOP8bR6oY/edit?usp=sharing",
  type: "Lecture",
  week: 3,
  date: "18-Feb-2016",
  description: "no description"
}, {
  title: "Assignment 1",
  link: "https://github.com/amrdraz/se-assignment",
  type: "Assignment",
  week: 3,
  date: "18-Feb-2016",
  description: "no description"
}, {
  title: "Lecture 4",
  link: "https://docs.google.com/presentation/d/1EuQzSHFkOyLIAxvddQNfNcFYW50ZQhnDZlk_gtfWi3E/edit?usp=sharing",
  type: "Lecture",
  week: 4,
  date: "18-Feb-2016",
  description: "no description"
}];

Template.week.helpers({
  materials: allMaterials,
  materialsOfWeek: function(weekNumber) {
    console.log("weekNumber -> " + weekNumber);
    return allMaterials.filter(function(el) {
      return el.week == weekNumber;
    })
  }
});
