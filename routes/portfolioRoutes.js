const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router.get("/", portfolioController.homepage);
router.get("/about", portfolioController.about);

router.get("/projects", portfolioController.projects);
router.get("/projects/:id", portfolioController.projectsId);
router.post("/review", portfolioController.postprojectsId);

router.get("/contact", portfolioController.contact);

module.exports = router;
