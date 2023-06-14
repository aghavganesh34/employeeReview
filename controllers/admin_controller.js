const Users = require('../models/user');

// This function is for assigning Work, and sending some data to it.
module.exports.assignWork = async function(req, res){
    let employe = await Users.find({});

    return res.render('admin',  {
        title : 'ERS',
        employe : employe
    });
}

// This function will show the list of employee woking in the company.
module.exports.showEmployeeList = async function(req, res){
    if(!req.isAuthenticated()){
       
        return res.redirect('/users/sign-in');
    }
    if(req.user.isAdmin == false){
        req.flash('error' , 'You are not Authorized');
        return res.redirect('/');
    }
    let employeList = await Users.find({});

    return res.render('employee', {
        title : "ERS | Employe-List",
        employes : employeList
    });
}

// This function will set the reviewer and reviewer.
module.exports.setReviewrAndReviewe = async function(req, res){
    try{
        // first checking if the req is made correct or not.
        if(!req.isAuthenticated()){
         
            // console.log("Please logIn");
            return res.redirect('/users/sign-in');
        }else{
            let employee = await Users.findById(req.user.id);
    
            if(employee.isAdmin == false){
                
                // console.log('User is not admin');
                return res.redirect('/users/sign-in');
            }
        
            else if(req.body.sender == req.body.reciver){
                // flash messages
                // console.log("sender === reciver")
               
                return res.redirect('back');
            }
            // After checking all the authentication , part the main part start from here.
            else{
                let sender = await Users.findById(req.body.sender);
                let reciver = await Users.findById(req.body.reciver);
                console.log(sender + " " + reciver);
                sender.userToReview.push(reciver);
                sender.save();
              
              
        
                return res.redirect('back');
            }
        }
    
        
    }catch(err){
        console.log("Errror in setting up the user " + err);
    }

}
// This function is for making the new Admin
module.exports.newAdmin = async function(req, res){
    try{
        // checking the authentication part.
        if(!req.isAuthenticated()){
           
        
           
            return res.redirect('/users/sign-in');
        }
        // Checking for authorization
        if(req.user.isAdmin == false){
            // flash messages
           
            return res.redirect('/');
        }
        // Making the user admin.
        if(req.user.isAdmin){
            let user = await Users.findById(req.body.selectedUser);
            if(!user){
                // flash Messages
                
                return res.redirect('back');
            }
          
            user.isAdmin = "true";
            user.save();
            return res.redirect('back');
        }
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// This function is for deleting the employee
module.exports.deleteEmployee = async function(req, res){
    try{
        // Authentication and Authoriztion chekcing
        if(!req.isAuthenticated()){
            // flash Messages
          
            return res.redirect('users/sign-in');
        }

        if(!req.user.isAdmin){
            // flash Messages
          
            return res.redirect('/');
        }
        // Deleting the user.
        let employee = await Users.deleteOne({_id : req.params.id});
        // flash Messages
    
        return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.addEmployee = function(req, res){
    return res.render('addEmployee', {
        title : 'ERS'
    });
}