import express from 'express'
import BlogController from '../controller/Blog/Blog.controller.js';
import multer from 'multer'
import upLoad from '../middleware/upload.middleware.js';
import redis from '../controller/Redis/redis.controller.js'

const router = express.Router();
const blog = new BlogController();

router.get('/getBlog', blog.FindById)
router.get('/account', blog.FindByAccount)
router.post('/create', blog.CreatePost)

//query vao db
//router.get('/get', blog.GetBlogbyPage)

//cache qua redis
router.get('/get', redis.GetBlogbyPage)


router.put('/update/:id', blog.Update)
router.delete('/deletesoft/:id', blog.DeleteSoft)
router.delete('/delete/:id', blog.Delete)
router.get('/find-by-title', blog.FindBlogByTittle)

export default router;
