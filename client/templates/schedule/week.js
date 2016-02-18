var allMaterials = [{
  title: "lecture 1",
  link: "https://docs.google.com/presentation/d/1eAEpBXXCG2iOu53wt23iWMqQIGYpGxrThRJiesskTdk/edit?usp=sharing",
  type: "lecture",
  week: 1,
  description: "no description"
}, {
  title: "lecture 2",
  link: "https://docs.google.com/presentation/d/1esCOJhl5xFaV_IaQ4PHNjUa2e8oI0551DRP-_RUGe6Q/edit?usp=sharing",
  type: "lecture",
  week: 2,
  description: "no description"
}, {
  title: "lecture 3",
  link: "https://docs.google.com/presentation/d/1PB05Hfx27uoJaw5jmnazSqz0ms6LSv0TbdHOP8bR6oY/edit?usp=sharing",
  type: "lecture",
  week: 3,
  description: "no description"
}, {
  title: "lecture 4",
  link: "https://docs.google.com/presentation/d/1EuQzSHFkOyLIAxvddQNfNcFYW50ZQhnDZlk_gtfWi3E/edit?usp=sharing",
  type: "lecture",
  week: 4,
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