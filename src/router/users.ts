import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner} from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/users',isAuthenticated as any,getAllUsers as any);
    router.get('/user', isAuthenticated as any, getUser as any);
    router.delete('/user/:id',isAuthenticated as any,isOwner as any,deleteUser as any);
    router.patch('/user/:id',isAuthenticated as any,isOwner as any,updateUser as any);
} 