// const express = require("express");
import express from "express";
import { notifController } from "../controller/notif.js";


const router = express.Router();


router.post("/create-sub",notifController);

export default router;