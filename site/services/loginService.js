module.exports = {
    minutesPerSession : 120000,
    restartSessionTime:  (req) => {
        let date = new Date(Date.now() + this.minutesPerSession);

        req.session.cookie.expires = date;
    },
    loginUser: (req, res, user) => {
        let date = new Date(Date.now() + this.minutesPerSession);
        
        req.session.cookie.expires = date;
        req.session.cookie.maxAge = this.minutesPerSession;

        res.locals.log = true;
        res.locals.user = user;
        req.session.log = true;
        req.session.user = user;

    },
    rememberUser: (user) => {

    },
    /*logOutSession: (req, res) => {
        if (req.session) {
            let date = new Date(Date.now() - 100);
            req.session.cookie.expires = date;
            req.session.cookie.maxAge = -100;
        };

        res.redirect('/users/login');
    }
    */
};
