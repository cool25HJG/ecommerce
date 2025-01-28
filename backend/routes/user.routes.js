const express = require('express');
const { getAllUser, deleteUser, updateUser } = require('../controller/user.controller');
const Router = express.Router()
Router.put('/:id',updateUser)
Router.delete('/:id',deleteUser)
Router.get('/',getAllUser)