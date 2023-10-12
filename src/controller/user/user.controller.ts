import { ApplicationController } from "../base.application.controller";
import { db } from '../../model/index';


 class UserController extends ApplicationController{
    
    constructor() {
         super(db.userModel)
     }
 }
export const userController =  new UserController()