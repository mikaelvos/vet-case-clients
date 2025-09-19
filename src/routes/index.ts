import Express, { Router } from 'express';
import { getOwner, getOwners } from '../controllers/clientsController.js';
import { getPets } from '../controllers/petsController.ts';
const router: Router = Express.Router();

const currentApiVersion: string = 'v1';
const apiSlug: string = '/api/' + currentApiVersion;

router.get(`${apiSlug}/owners`, getOwners);
router.get(`${apiSlug}/owners/:id`, getOwner);

router.get(`${apiSlug}/pets`, getPets);

export default router;
