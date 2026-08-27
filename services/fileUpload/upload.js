import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let isExistFile = fs.writeFile('/output.js')

    if(!isExistFile){
       isExistFile =  fs.mkdir('/output.js')
    }

    cb(null, isExistFile);
  },

  filename: function (req, file, cb) { 
    cb(null, file.originalname);
  }


});

const upload = multer({storage:storage})


export {upload}




