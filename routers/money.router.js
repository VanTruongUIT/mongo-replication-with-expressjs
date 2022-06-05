const express = require('express'); 
const router = express.Router();
const money = require('../models/money.model')

const {startSession} = require('mongoose')



router.get('/', (req, res) => {
    res.send('Hello world!')
})

// Create ATM
router.post('/v1/api/user', (req, res) => {
    console.log("Start post to create user");
    try {
        const {userId, amount} = req.body;
        const rs = money.create({userId, amount});
        console.log(`Request user data: ${req.body}`);
        res.json({
            data: req.body
        })
    } catch (error) {
        
    }
})

// Transfer money from A -> B
router.post('/v1/api/transfer', async (req, res) => {
    const session = await startSession();

    try {
        const {fromId, toId, amount} = req.body;

        // create startSession
        session.startTransaction();

        const amountFrom = await money.findOneAndUpdate({
            userId: +fromId
        }, {
            $inc: {amount: -amount}
        }, {session, new: true});

        console.log(`Account ${fromId} is: ${amountFrom}`);
        
        if (amountFrom.amount < 0 ) {
            console.warn(`Hey, transaction has the error, fix it now developers :)`);
            throw new Error(`Sender doesn't have enough money to send!`)
        }

        const amountTo = await money.findOneAndUpdate({
            userId: +toId
        }, {
            $inc: {amount: amount}
        }, {session, new: true});

        console.log(`Account ${toId} is: ${amountTo}`);
        
        await session.commitTransaction();
        session.endSession();


        return res.json({
            msg: "Transaction is successfully"
        })

    } catch (error) {
        console.log(`Error Transaction! \nError message: ${error}`);

        await session.abortTransaction();
        session.endSession();

        return res.json({
            msg: `Transaction have error: ${error}`
        })
    }

})

module.exports = router;

