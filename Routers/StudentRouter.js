const express = require('express');
const {mongoose} = require('mongoose');
const Student = require('../Models/StudentMentor');

const studentRouter = express.Router();

studentRouter.get('/', async (req,res) => {
        try{
            const students = await Student.find();
            res.send(students);
        }catch(err){
            res.status(400).send(err);
        }
    
})

studentRouter.post('/createstudent',async (req,res) => {
    const addStudent = new Student({
        "name" : req.body.name,
        "batch" : req.body.batch,
        "mentor" : req.body.mentor ? req.body.mentor : undefined
     })
    try{
        const newStudent = await addStudent.save();
        res.send(newStudent)
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
/*  List of students with no mentors */

studentRouter.get('/no-mentors',async (req,res) => {
    const students = await Student.find({mentor:undefined})
    res.send(students);
})

/* Assign or change Mentor for Student -- select one student and assign one mentor */

studentRouter.patch('/assignmentor/:id',async (req,res) => {
    const {id} = req.params;
    const {mentor} = req.body;
    try{
        const student = await Student.findById(id);
        student.mentor = mentor;
        await student.save();
        res.send(student);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

/* select one mentor and add to multiple students */

studentRouter.get('/schedule/mentorstudents/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        console.log(mentorId)
        const students = await Student.find({ mentor: mentorId });
        res.status(200).json({
            message: 'Successfully fetched students data with mentor',
            students
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

/* show all students for a particular mentor */

studentRouter.get('/mentorstudents/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const students = await Student.find({mentor : id});
        res.send(students);
    }catch(err){
        res.send(err);
    }
})

module.exports = studentRouter;