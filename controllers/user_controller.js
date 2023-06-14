const User = require('../models/user'); // requring user

// redering the singIN page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title : 'ERS'
    });
}
// creating the session, basically for logging In
module.exports.createSession = async function(req, res){
    // console.log(req.body);

    return res.redirect('/');
}

// This function is used for rendering the signUp page

module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title : 'ERS'
    });
}

// This fucntion is for creating the new user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages

        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// This fucniton is used for logging Out
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        return res.redirect('/users/sign-in');
    });
    
}



module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    return res.redirect('back');
}

// THis function is used for making the new Admin, it is admin specific, fucntion
module.exports.makeAdmin = async function(req, res){
    try {
        if (req.body.admin_password == 'ganesh') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
