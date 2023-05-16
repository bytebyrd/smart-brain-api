const bcrypt = require('bcrypt');
const db = require('../database/db');

async function registerUser(req, res) {
    const { username, email, password } = req.body;
    if(!username || !email || !password ){
        return res.status(400).json({ err: "Incorrect form submission"})
    }
    const hash = await bcrypt.hash(password, 10);
    db.transaction(trx => {
        trx('login').insert({ email, hash })
            .then(() => {
                return trx('users').insert({ name: username, email })
            })
            .then(id => {
                return trx('users').select('*').where({ id: id[0] })
            })
            .then(data => {
                trx.commit();
                res.json(data[0])
            })
            .catch(err => {
                trx.rollback();
                res.status(400).json(err)
            })
    })
}

async function signInUser(req, res) {
    const { email, password } = req.body;
    try {
        const [auth] = await db('login').select('hash').where({ email });
        const isAuthorized = await bcrypt.compare(password, auth.hash);
        if (isAuthorized) {
            const [user] = await db('users').select('*').where({ email });
            res.json(user);
        } else {
            res.status(401).json({ err: "Incorrect email or password" })
        }
    } catch (err) {
        res.status(401).json({ err: "Invalid credentials" })
    }
}

async function getProfile(req, res) {
    const { id } = req.params;
    try {
        const [profile] = await db('users').select('*').where({ id });
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ err: `Cannot get profile ${id}` })
        }
    } catch (err) {
        res.status(404).json({ err: `Cannot get profile ${id}` })
    }
}

async function updateEntries(req, res) {
    const { id } = req.body;
    await db('users').where('id', '=', id).increment('entries', 1);
    //mysql does not return anything on update, so we have to fetch the update
    const [entries] = await db('users').select('entries').where({ id })
    res.json(entries.entries)
}

module.exports = {
    getProfile,
    registerUser,
    signInUser,
    updateEntries
}