const Freelance = require("../models/freelance.model");


exports.getFreelances = (req, res) => {
    Freelance.find().then((freelances) => {
      res.send(freelances);
      console.log(freelances);
    }).catch((err) => res.status(400).send(err));
};
  
exports.getOneFreelance = (req, res) => {
    Freelance.findById(req.params.id).then((freelance) => {
      res.send(freelance);
      console.log(freelance);
    }).catch((err) => res.status(400).send(err));
};

exports.getFreelanceByCity = (req, res) => {
    const emptyArr = [];
    const searcha = req.body.userCity;
    Freelance.find({$userCity: {$search: searcha}}).then((freelance) => {
        for (let index = 0; index < freelance.length; index++) {
           console.log(freelance[index].userCity);
           console.log(searcha);
           if(freelance[index].userCity === searcha) {
                emptyArr.push(freelance[index]);
           } else {
                console.log("No");
           }
        }
        res.send(emptyArr);
        console.log(emptyArr);
    });
}
