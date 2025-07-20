import mongoose,{Schema,Document} from 'mongoose'; 
export interface FitgenixUser extends Document{
    name:string,
    phonenumber:string,
    email:string,
    gender:string,
    password:string,
}
const userschema=new Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model<FitgenixUser>('FitgenixUsermodel',userschema);