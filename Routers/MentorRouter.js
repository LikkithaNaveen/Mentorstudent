const express = require('express');
const  mongoose  = require('mongoose');
const Mentor = require('../Models/MentorModel');

const mentorRouter = express.Router();
/* get all mentor details */
mentorRouter.get('/', async (req,res) => {
    try{
        const mentors = await Mentor.find();
        res.send(mentors);
    }catch(err){
        res.status(400).send(err);
    }
    
})
/* create mentor */
mentorRouter.post('/creatementor',async (req,res) => {
    let mentordetails=new Mentor(req.body)
    let result= await mentordetails.save()
    if(result)
    {
        res.send({result:'successfully created'})
    }
    else{
        res.send({result:'Error'})
    }
})
/* get mentor based on ID */
mentorRouter.get('/getmentor/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const mentor = await Mentor.findById({_id : id})
        res.status(200).send(mentor);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

module.exports = mentorRouter;