export default function Validate(value){
    const errors = {};
    const name_pattern = /^[a-zA-Z ]{2,40}$/;
    const email_pattern = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    if(value.name === ''){
        errors.name = 'Name is required';
    }
    else if(!name_pattern.test(value.name)){
        errors.name ='Enter valid name'
    }
    if(value.email === ''){
        errors.email = 'email is required';
    }
    else if(!email_pattern.test(value.email)){
        errors.email ='Enter valid email'
    }
    if(value.password === ''){
        errors.password = 'password is required';
    }
    else if(!password_pattern.test(value.password)){
        errors.password ='Enter valid password'
    }
    if(value.confirmpassword === ''){
        errors.confirmpassword = 'confirm password is required';
    }
    else if(value.confirmpassword !==value.password){
        errors.confirmpassword ='Password and confirm password not matching';
    }
    return errors;

}