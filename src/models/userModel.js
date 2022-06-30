const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    lastLogin:{
        type:Date,
        default: Date.now()
    },
    role:{
        type: String,
        enum: {
          values: ['user', 'admin'],
        },
        default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},{
    timestamps:true
})
userSchema.pre('save', async function(next){
    // Only run this function if password was actually modified
  if(!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password ,12)
  next();
})


userSchema.methods.updateLastLogin = async function(){
    this.lastLogin = Date.now();
    await this.save();
}

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  
  userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  

const User = mongoose.model('User', userSchema);

module.exports = User;

//2022-06-21T20:42:33.672Z