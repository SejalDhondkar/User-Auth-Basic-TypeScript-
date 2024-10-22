import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        
        return res.status(200).json(user).end();        

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!existingUser) {
            res.sendStatus(400);
        }

        const expectedHash = authentication(existingUser.authentication.salt, password);

        if(existingUser.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();

        existingUser.authentication.sessionToken = authentication(salt, existingUser._id.toString());

        await existingUser.save();

        res.cookie('SEJAL-AUTH',existingUser.authentication.sessionToken, { domain: 'localhost', path: '/'} );

        return res.status(200).json(existingUser).end();
        

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}