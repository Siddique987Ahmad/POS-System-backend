const express=require('express')
const authorize = require('../Middleware/auth.Middleware')
const { registerUser, login, logoutUser, getAll, getUserById, updateUser, deleteUser } = require('../Controllers/user.Controller')
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',authorize([]),logoutUser)
router.get('/get',authorize(['view_all']),getAll)
router.get('/getuserbyid/:id',authorize(['view_all']),getUserById)
router.patch('/update/me',authorize([]),updateUser)
router.delete('/delete/:id',authorize(['edit_all','delete_all']),deleteUser)
module.exports=router