app.factory("userSrv", function($q) {

    var activeUser = null;

    function User(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.country = parseUser.get("country");
        this.state = parseUser.get("state");
        this.city = parseUser.get("city");
        this.street = parseUser.get("street");
        this.zipcode = parseUser.get("zipcode");
        this.phone = parseUser.get("phone");
        this.adminsw = parseUser.get("adminsw");
        this.gender = parseUser.get("gender");
        this.bdate = parseUser.get("bdate");
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, pwd) {
        var async = $q.defer();

        activeUser = null;

        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then(function(user) {
            // Do stuff after successful login
            console.log('Logged in user', user);
            activeUser = new User(user);
            async.resolve(activeUser);
        }).catch(error => {
            console.error('Error while logging in user', error);
            async.reject(error);
        });

        return async.promise;
    }

    function logout() {
        activeUser = null;
        ParseUser.logOut();
    }

    function getActiveUser() {
        return activeUser;
    }

    function addUserbyEmailPsw(email, pwd) {
        var async = $q.defer();
        activeUser = null;

        var user = new Parse.User();

        user.set('email', email);
        user.set('password', pwd);
        user.set('username', email);

        user.signUp().then((user) => {
            console.log('User signed up', user);
            activeUser = new User(user);
            async.resolve(activeUser);
        }).catch(error => {
            console.error('Error while signing up user', error);
        });

        return async.promise;
    }


    function updateUser(userTmp) {
        var async = $q.defer();
        activeUser = null;

        var UserParse = new Parse.User();
        var query = new Parse.Query(UserParse);

        query.get(userTmp.id).then((user) => {
            // Updates the data we want
            user.set('username', userTmp.email);
            user.set('email', userTmp.email);
            user.set('fname', userTmp.fname);
            user.set('lname', userTmp.lname);
            user.set('country', userTmp.country);
            user.set('state', userTmp.state);
            user.set('city', userTmp.city);
            user.set('zipcode', userTmp.zipcode);
            user.set('street', userTmp.street);
            user.set('phone', userTmp.phone);
            user.set('adminsw', false);
            user.set('gender', userTmp.gender);
            user.set('bdate', userTmp.bdate);
            // Saves the user with the updated data
            user.save().then((response) => {
                console.log('Updated user', user);
                activeUser = new User(user);
                async.resolve(activeUser);
            }).catch(error => {
                console.error('Error while updating user', error);
            });
        });
        return async.promise;
    }


    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        addUserbyEmailPsw: addUserbyEmailPsw,
        updateUser: updateUser
    }

});