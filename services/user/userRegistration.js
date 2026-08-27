import userRegistration from "./userRegistrationModel.js";
import hash from "bcryptjs";
import jwt from 'jsonwebtoken';

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await hash.hash(password, 10);

    if (!name) {
      return res.json({ message: "name is required field" });
    }

    if (!email) {
      return res.json({ message: "email is required field" });
    }

    if (!password) {
      return res.json({ message: "password is required field" });
    }

    const newUser = await userRegistration.create({
      username: name,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      return res.json({
        message: "user registered successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
    try{
        const { email, password } = req.body;
        
        if(!email){
            return res.json({message:"email is required field"});
        }

        if(!password){
            return res.json({message:"password is required field"});
        }

        const user = await userRegistration.findOne({ where: { email } });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        const isMatch = await hash.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const loginUser = await userLogin.create({
            email: email,
            token: token,
            login: true,
        })

        if(loginUser){
            return res.json({ message: "Login successful", data: user, token });
        }else{
            return res.json({ message: "Error creating login record" });
        }

    }catch(error){
        console.log("Error logging in user:", error);   
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function logoutUser(req, res) {
    try{

        const { email } = req.body;

        if(!email){
            return res.json({message:"email is required field"});
        }

        const user = await userLogin.findOne({ where: { email } }); 

        if(!user){
            return res.json({message:"user not found"});
        }

         const logoutUser = await userLogin.update({ logout: true }, { where: { email } });

         if(logoutUser){
            return res.json({message:"user logged out successfully"});  
          }

    }catch(error){
      return res.json({message:"error logging out user", error: error})
    }
}

export { registerUser,loginUser,logoutUser };
