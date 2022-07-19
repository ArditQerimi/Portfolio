const Projects = require("../models/projects");
const Reviews = require("../models/reviews");

exports.homepage = async (req, res) => {
  try {
    res.render("index", { title: "My Portfolio", page_name: "homepage" });
  } catch (error) {
    console.log("error");
  }
};

exports.about = async (req, res) => {
  try {
    res.render("about", { title: "About", page_name: "about" });
  } catch (error) {
    console.log("error, can't find data");
  }
};

exports.projects = async (req, res) => {
  try {
    Projects.find().then((projects) => {
      res.render("projects", {
        title: "Projects",
        page_name: "projects",
        projects: projects,
      });
    });
  } catch (error) {
    console.log("error");
  }
};

exports.projectsId = async (req, res) => {
  try {
    let projectId = req.params.id;
    const projectbyId = await Projects.findById(projectId);

    Reviews.find().then((review) => {
      res.render("project", {
        title: "Projects",
        page_name: "projects",
        projectbyId,
        review: review,
      });
    });
    // res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.log("Error occurred in projects");
    console.log(error);
  }
  // res.redirect("/project");
};

exports.postprojectsId = async (req, res) => {
  try {
    let projectId = req.params.id;
    const projectbyId = await Projects.findById(projectId);

    Reviews.find().then((review) => {
      res.render("project", {
        title: "Projects",
        page_name: "projects",
        projectbyId,
        review: review,
        name: req.body.name,
        message: req.body.message,
      });
    });
    let newReview = new Reviews({
      name: req.body.name,
      message: req.body.message,
    });
    await newReview.save();
    res.redirect(`/review`);
  } catch (error) {
    console.log("Error occurred in post projects");
    console.log(error);
  }
};

exports.contact = async (req, res) => {
  try {
    res.render("contact", {
      title: "Contact",
      page_name: "contact",
    });
  } catch (error) {
    console.log("Error occurred in contact");
    console.log(error);
  }
};
