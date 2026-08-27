import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let isExistFile = fs.writeFile('/output.js')

    if(!isExistFile){
       isExistFile =  fs.mkdir('/output.js')
    }



    cb(null, file);
  },

});


async function fileUpload(req,res){
   try{

   }catch(error){
    return res.json({message:"file Upload falied"})
   }
}

export {fileUpload}




