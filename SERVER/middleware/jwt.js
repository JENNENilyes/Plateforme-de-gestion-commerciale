const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const asyncHandler =require('express-async-handler');
const ClientModel = require('../models/ClientModel');

/*function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
          //  {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
           // {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `/client/login`,
            `/client/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}*/
module.exports.authJwt = asyncHandler(async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try { 
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = jwt.verify(token, process.env.secret)
  
        req.clien = await ClientModel.findById(decoded.clientId).select('-password')
  
        next()
      } catch (error) {
        console.error(error)
        res.status(401).send('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401).send('Not authorized, no token')
    }
  })





  module.exports.admin = asyncHandler(async(req, res, next) => {
    if (req.clien && req.clien.isAdmin) {
     //  console.log(req.clien)
      next()
    } else {
    
      res.status(401).send('Not authorized as an admin')
    }
  })
  

