export const createValidationSchema = {
    username: {
     isLength:{
        options:{
            min:4,
            max:32
        },
        errorMessage:
        "username must be at least 4 characters with a max of 32 characters"
     } ,
    notEmpty: {
      errorMessage:"username cannot be empty"
    },
  
    isString:  {
      errorMessage:"username must be a string"
    },
    },
    displayName:{
        notEmpty:true,
    },
};