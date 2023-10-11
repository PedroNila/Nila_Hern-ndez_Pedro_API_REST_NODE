const { Router } = require("express");
const controller = require("./controller"); 

const router = Router();

router.get('/', controller.getStudents);
router.post("/", controller.addStudents);
router.get("/:id", controller.getStudentsById);
router.put("/:id", controller.updateStudents);
router.delete("/:id", controller.removeStudents);



module.exports = router;