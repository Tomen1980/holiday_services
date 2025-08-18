import { Router } from "express";
import HolidayController from "../../controllers/holiday/holiday.controller.js";
import validateRequest from "../../middleware/validate.request.js";
import { createHolidaySchema, updateHolidaySchema } from "../../validator/holiday.validator.js";
import validateApiKey from "../../middleware/validateHeaders.js";
import { config } from "../../config/config.js";
import upload from "../../utils/upload.js";

const router = Router();


router.use(validateApiKey(config.API_KEY));

router.get("/", HolidayController.getHolidays);
router.post("/",validateRequest(createHolidaySchema), HolidayController.createHoliday);
router.put("/:id",validateRequest(updateHolidaySchema), HolidayController.updateHoliday);
router.delete("/:id", HolidayController.deleteHoliday);
router.post("/upload-holidays", upload.single("file"), HolidayController.uploadHolidays);

export default router;
