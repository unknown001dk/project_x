import express from 'express';
import { loginUser, logoutUser, registerUser, updateUser, deleteUser } from '../controllers/User-controller.js';

const router = new express.Router();

router.get('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.put('/update:id', updateUser);
router.delete('/delete:id', deleteUser);

export default router;