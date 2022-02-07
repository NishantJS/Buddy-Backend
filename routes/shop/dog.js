import express from 'express'
import { _findAll , _create} from "../../controller/dogs.js";

const dog = express.Router();

dog.get("/", async (req, res) => {
  try {
    const { error, data } = await _findAll();
    if (error) {
      return res.status(500).json({ error: true, data });
    } else{
      return res.status(200).json({ error: false, data});
    }
    
  } catch (err) {
    return res.status(500).json({ error: true, data : err.message || err});
  }
})

dog.post("/",async (req, res) => {
  try {
    if (req.body.uci < 100 || req.body.uci > 200) throw "Invalid uci for this path"
    
    let { error, data } = await _create(req);

    if (error) {
      res.status(500).json({ error: true, data });
    } else {
      res.status(201).json({ error: false, data });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: err });
  }
});

dog.delete("/", async () => {
  
})

export default dog;