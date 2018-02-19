var express = require("express");
var router = express.Router();
const hardwareController = require("../controllers/hardwareController");
const { catchErrors } = require("../handlers/errorHandlers");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/browse", catchErrors(hardwareController.getHardware));
router.get("/add", hardwareController.addHardware);
router.post(
  "/add",
  hardwareController.upload,
  catchErrors(hardwareController.resize),
  catchErrors(hardwareController.createHardware)
);
router.post(
  "/add/:id",
  hardwareController.upload,
  catchErrors(hardwareController.resize),
  catchErrors(hardwareController.updateHardware)
);
router.get("/hardware/:id/edit", catchErrors(hardwareController.editHardware));

router.get(
  "/hardware/:slug",
  catchErrors(hardwareController.getHardwareBySlug)
);

module.exports = router;
