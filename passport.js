var configAuth = require ('./auth');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {

	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	 },
		function(accessToken, refreshToken, profile, done) {
		  process.nextTick(function(){
			FacebookUser.findOne({'fbID': profile.id}, function(err, user){
					if (err)
					{
						return done(err);
					}
					if (user)
					{
						return done(null, user);
					}
					else 
					{
						FacebookUser.create({fbID: profile.id, token: accessToken, 
						name: profile.name.givenName + ' ' + profile.name.familyName,
						email: profile.email[0].value}, function(err, user){
							if (err)
							{
								console.log("Cannot create facebook user");
							}
							else{
								return done(null, user)
							}
						});
					}
				});
			});
		}
    ));
};