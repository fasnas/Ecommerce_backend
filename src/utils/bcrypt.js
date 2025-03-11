import bcrypt from "bcrypt"

export const hashPassword=async(password)=>{
    return await bcrypt.hash(password,10)
}

export const comparepassword=async(password,newpassword)=>{
    return await bcrypt.compare(password,newpassword)
}

