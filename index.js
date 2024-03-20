const mentorRouter = require('./Routers/MentorRouter')
const studentRouter = require('./Routers/StudentRouter')

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());  /* To avoid cross origin error */

app.use(express.json());  

const PORT = 3000;
const URL = "mongodb+srv://lamadev:8jrqyCXOkW7uWEtw@cluster0.pbqp57k.mongodb.net/StudentMentor";

const mongoose = require('mongoose');

mongoose.connect(URL)
const connection = mongoose.connection;
connection.on('open',() => console.log("MongoDB Connected"));



// app.get('/',(req,res) => res.send(`
// <div>
// <p> In Home Page </p>
// <p>To get all mentor List - https://zen-assign-mentors.herokuapp.com/Mentors </p>
// <br>
// <p>To get all Students List - https://zen-assign-mentors.herokuapp.com/Students </p>
// <br>
// <p>To get mentor based on ID - https://zen-assign-mentors.herokuapp.com/Mentors/get-mentor/:id<p>
// <p>sample - https://zen-assign-mentors.herokuapp.com/Mentors/get-mentor/60e7f515d5ff5342a06652e3 </p>

// <p> To test Post and update - visit Frontend page of the application - https://preethi-st.github.io/ZEN-Mentors-Frontend/ </p>
// </div>
// `))

app.use('/Mentors',mentorRouter);
app.use('/Students',studentRouter);

app.listen(PORT, () => console.log(`Server started in the port ${PORT}`))