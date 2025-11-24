import express from 'express';
const router = express.Router();
import { verifyJWT } from '../middleware/auth.js';
import {
    createMoodBoard,
    getUserMoodBoards,
    getMoodBoardById,
    updateMoodBoard,
    deleteMoodBoard,
    addCollaborator,
    updateCollaboratorStatus,
    removeCollaborator,
    addMessage,
    getPublicMoodBoards
} from '../controller/moodBoardController.js';

// Public routes
router.get('/public', getPublicMoodBoards);

// Protected routes (require authentication)
router.use(verifyJWT);

// Mood board CRUD operations
router.post('/', createMoodBoard);
router.get('/user', getUserMoodBoards);
router.get('/:id', getMoodBoardById);
router.put('/:id', updateMoodBoard);
router.delete('/:id', deleteMoodBoard);

// Collaboration routes
router.post('/:id/collaborators', addCollaborator);
router.put('/:id/collaborators/status', updateCollaboratorStatus);
router.delete('/:id/collaborators/:collaboratorId', removeCollaborator);

// Messaging routes
router.post('/:id/messages', addMessage);

export default router;
