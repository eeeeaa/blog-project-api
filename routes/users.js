const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/", user_controller.users_get);
router.post("/", user_controller.users_post);

router.get("/:userId", user_controller.users_get_one);
router.put("/:userId", user_controller.users_put);
router.delete("/:userId", user_controller.users_delete);

module.exports = router;
