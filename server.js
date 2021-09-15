const bodyParser = require("body-parser");
var express = require("express");
const mongoose = require("mongoose")
var app = new express();
const { response } = require("express");

const Expert = require("./public/js/Experts")
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/experts", {useNewUrlParser: true})

// app.route('/expert')
// .post()
// .get()
// .delete()


// part 1
app.post("/experts", (req, res) => {
  const expert = new Expert({
    expert_id: req.body.id,
    expert_password: req.body.password,
    expert_name: req.body.name,
    expert_address: req.body.address,
    expert_phone: req.body.phone
  })
  expert.save((err) => {
    if(err) {
      console.log("Failed added a new expert!")
      res.send(err)
    }
    else {
      console.log("Successfully added a new expert!")
      res.send("Successfully added a new expert!")
    }
  })
})

app.get("/experts", (req, res) => {
  Expert.find((err, expertsList) => {
    if(err) {
      console.log("Failed find a list of new experts!");
      res.send(err)
    }
    else {
      console.log("Successfully find a list of new experts!");
      res.send(expertsList)
    }
  })
})

app.delete("/experts", (req, res) => {
  Expert.deleteMany((err) => {
    if(err) {
      console.log("Failed delete all experts!");
      res.send(err)
    }
    else {
      console.log("Successfully delete all experts!");
      res.send("Successfully delete all experts!")
    }
  })
})


// part 2
app.route("/experts/:id")
.get((req, res) => {
  Expert.findOne({expert_id: req.params.id}, (err, foundExpert) => {
    if(foundExpert) {
      console.log("Find a matched expert!");
      res.send(foundExpert);
    }
    else {
      console.log("No matched expert!");
      res.send(("No matched expert!"));
    }
  })
})
.delete((req, res) => {
  Expert.deleteOne({expert_id: req.params.id}, (err) => {
    if(err) {
      console.log("Failed delete an experts!");
      res.send(err)
    }
    else {
      console.log("Successfully delete an experts!");
      res.send("Successfully delete all experts!")
    }
  })
})

// part 3
.patch((req, res) => {
  Expert.findByIdAndUpdate({expert_id: req.params.id},
    {$set: req.body},
    (err) => {
      if(err){
        console.log("Failed update the address and mobile phone of an expert!")
        res.send(err)
      }
      else {
        console.log("Successfully update the address and mobile phone of an expert!")
        res.send("Successfully update the address and mobile phone of an expert!");
      }
    }
  )
})

// part 4
.put((req, res) => {
  Expert.findByIdAndUpdate({expert_id: req.params.id},
    {$set: {expert_password: req.body.password}},
    {overwrite: true},
    (err) => {
      if(err) {
        console.log("Failed update the password of an expert!");
        res.send(err);
      }
      else {
        console.log("Successfully update the password of an expert!");
        res.send("Successfully update the password of an expert!");
      }
    }
  )
})



app.listen(3000, () => {
  console.log("Server started on port 3000 successfully!");
});
