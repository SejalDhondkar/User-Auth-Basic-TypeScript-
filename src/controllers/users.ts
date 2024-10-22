import express from 'express';
import { deleteUserById, getUserByID, getUserBySessionToken, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['SEJAL-AUTH'];

        const currentUser = await getUserBySessionToken(sessionToken);

        if(!currentUser) {
            return res.sendStatus(403);
        }

        return res.status(200).json(currentUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const user = await getUserByID(id);

        if(!user) {
            res.sendStatus(400);
        }

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const { username } = req.body;

        const user = await getUserByID(id);

        if(!user || !username) {
            res.sendStatus(400);
        }

        const updatedUser = await updateUserById(id,{
            username,
        });

        await updatedUser.save();

        return res.status(200).json(updatedUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}