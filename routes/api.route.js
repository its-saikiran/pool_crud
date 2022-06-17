const express = require("express")
const router = express.Router();

const {
    getDataController,
    getDataByIdController,
    insertDataController,
    patchDataController,
    deleteDataController
} = require('../controllers/controller')


router.get("/get", getDataController);
router.get('/get/:id', getDataByIdController);
router.post("/create", insertDataController);
router.put("/update/:id", patchDataController)
router.delete("/delete/:id", deleteDataController)

module.exports = router;
