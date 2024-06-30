const express = require ("express");
const users = require ("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
//Middleware 
app.use(express.urlencoded({extended: false}));
const PORT = 8000;
app.get('/users', (req,res)=>{
    const html = `<ul>
    ${users.map((user)=> { return `<li>${user.first_name}</li>`}).join(' ')};
    </ul>`;
    res.send(html);
})
// rest api 
app.get('/api/users', (req,res)=>{
     res.json(users);
});
// app.get('/api/user/:id',(req,res)=>{
//         const id = (req.params.id);
//         console.log(id);
//         const user = users.map((user)=>{ return user.gender=== id}).join(' ');
//         console.log("hi i am user",user);
//         return res.json(user);
// });
// app.post("/api/users",(req,res)=>{
//         // TODO : Create new user
//         res.json({status : "pending"});
// });
// app.patch('/api/user/:id', (req,res)=>{
//          return res.json({status : "pending"});
// });

// app.delete('/api/users/:id', (req,res)=>{
//     return res.json({status : "pending"});
// });

app.route('/api/user/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    console.log("get : ",id);
    const requser = users.find((user)=> user.id === id)
    console.log(requser);
    return res.json(requser);
})
.post((req,res)=>{
    const id= Number(req.params.id);
    const body = req.body ;
    console.log("body",body);
    users.push({id: id ,...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{})
    return res.json({status : "pending post reqest"});
})
.patch((req,res)=>{
    const id = Number(req.params.id);
    console.log("patch : ",id);
    console.log("type of id ",typeof id);
    console.log("I am patch : ",req.body);

    console.log("I am patch typeof : ", typeof req.body );
    const updatedusers = users.map((user)=>{
        // console.log("khushi", user)
        //    console.log("user.id : ", user.id);
        //    console.log("user.id  typeof : ",typeof user.id);
            if(user.id=== id){
               
                console.log("user1 : ",user);
                console.log("req.body1: ",req.body);
                user = {id : id, ...req.body};
                console.log("user2 : ",user);
                console.log("req.body2: ",req.body);
            }
            if(user.id=== id)  console.log("user3 : ",user);
            return user;
    } 

);
    console.log(typeof updatedusers);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedusers),(err,data)=>{})
    return res.json(updatedusers);
})
.delete((req,res)=>{
    const id = Number(req.params.id);
    console.log("get : ",id);
     const updatedUsers = users.filter((user)=> user.id !==id);
     fs.writeFile("./MOCK_DATA.json",JSON.stringify(updatedUsers),(err,data)=>{});
    return res.json(updatedUsers);
})
app.listen(PORT, ()=>{
    console.log(`server Started at port : ${PORT}`);
})