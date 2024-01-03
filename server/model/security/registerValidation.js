const Yup=require('yup');

exports.schema=Yup.object().shape({
    name:Yup.string()
    .required('Name Is Required'),
    username:Yup.string()
    .email('Please Enter A Valid Email')
    .required('Username Is Required'),
    password:Yup.string()
    .required('Password Is Required')
    .min(8,'Password Should Be More Than 7 Characters')
    .max(80,'Password Shouldnt Be More Than 20 Characters'),
    repeatpassword:Yup.string()
    .required('You Should Repeat Your Password')
    .oneOf([Yup.ref("password"),null],'Password And Repeatpassword Should be Equal')
});