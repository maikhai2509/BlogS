import multer from "multer";
import BlogModel from "../../model/Blog.model.js"
import AccountUserModel from "../../model/AccountUser.model.js";
import TopicController from "../Topic/topic.controller.js";


const toipicontrol = new TopicController();

class BlogController {
    async GetBlogbyPage(req,res,next) {
        try {
            let {pageSize,pageIndex,topicId,accountId,roleName} = req.query;
            console.log(accountId)
            console.log(roleName)
            if((pageSize * 1) <= 0 || !Boolean(pageSize)) {
                pageSize = 10;
            }
            if((pageIndex * 1) <= 0 || !Boolean(pageIndex)) {
                pageIndex = 1;
            }

            if(pageIndex && pageSize) {
                //list cac post theo ca nhan
                if(roleName === 'user'){
                    if(topicId) {
                        var listTong = await BlogModel.find({deleted: false,TopicId: topicId,AuthorId: accountId}).exec();
                        var list = await BlogModel.find({deleted: false,TopicId: topicId,AuthorId: accountId}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {
                            let author =  await AccountUserModel.findOne({
                                    _id : accountId
                            }).exec();
    
                            let topic = await toipicontrol.SearchTopic(item.TopicId);
                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get products successfully!",
                            totalItem: total,
                            pageSize: pageSize * 1,
                            pageIndex: pageIndex * 1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    } 
                      
                    else {
                        var listTong1 = await BlogModel.find({deleted: false, AuthorId: accountId}).exec();
                        var list = await BlogModel.find({deleted: false, AuthorId: accountId}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {
                            let author =  await AccountUserModel.findOne({
                                    _id : accountId
                            }).exec();
                            let topic = await toipicontrol.SearchTopic(item.TopicId);
                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong1.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get blogs successfully!",
                            totalItem: total,
                            pageSize: pageSize*1,
                            pageIndex: pageIndex*1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    }
                } 

                //list post qua admin
                if(accountId == process.env.ADMIN_ID){
                    if(topicId) {
                        var listTong = await BlogModel.find({deleted: false,TopicId: topicId}).exec();
                        var list = await BlogModel.find({deleted: false,TopicId: topicId}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {
                            let author =  await AccountUserModel.findOne({
                                    _id : item.AuthorId
                            }).exec();
    
                            let topic = await toipicontrol.SearchTopic(item.TopicId);
                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get products successfully!",
                            totalItem: total,
                            pageSize: pageSize * 1,
                            pageIndex: pageIndex * 1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    } 
                    
                    
                    else {
                        var listTong1 = await BlogModel.find({deleted: false}).exec();
                        var list = await BlogModel.find({deleted: false}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {

                            let author =  await AccountUserModel.findOne({
                                    _id : item.AuthorId
                            }).exec();
                            let topic = await toipicontrol.SearchTopic(item.TopicId);

                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong1.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get blogs successfully!",
                            totalItem: total,
                            pageSize: pageSize*1,
                            pageIndex: pageIndex*1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    }

                }

                //list post qua user ko reg
                if(accountId === undefined){
                    if(topicId) {
                        var listTong = await BlogModel.find({deleted: false,TopicId: topicId}).exec();
                        var list = await BlogModel.find({deleted: false,TopicId: topicId}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {
                            let author =  await AccountUserModel.findOne({
                                    _id : item.AuthorId
                            }).exec();
    
                            let topic = await toipicontrol.SearchTopic(item.TopicId);
                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get products successfully!",
                            totalItem: total,
                            pageSize: pageSize * 1,
                            pageIndex: pageIndex * 1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    } 
                    
                    
                    else {
                        var listTong1 = await BlogModel.find({deleted: false}).exec();
                        var list = await BlogModel.find({deleted: false}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                        var newListv1 = [];
                        for(const item of list) {
                            let author =  await AccountUserModel.findOne({
                                    _id : item.AuthorId
                            }).exec();
                            let topic = await toipicontrol.SearchTopic(item.TopicId);
                            newListv1.push({
                                blog: item,
                                author: author,
                                topicInfor: topic
                            })
                        }
                        let totalPage;
                        let total = listTong1.length;
                        if(total <= pageSize) {
                            totalPage = 1
                        } else {
                            totalPage = Math.floor(total / pageSize) + 1;
                        }
                        return res.status(200).json({
                            msg: "Get blogs successfully!",
                            totalItem: total,
                            pageSize: pageSize*1,
                            pageIndex: pageIndex*1,
                            products: newListv1,
                            totalPage: totalPage
                        })
                    }
                }
            }
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    
    async CreatePost(req,res,next) {
        try {
            //data backend nhận từ Fe truyền xuống req.body
            console.log(req.body);
            let BlogMD = new BlogModel(req.body);
            let rs = await BlogModel.create(BlogMD);
            return res.status(200).json({
                data: rs,
                msg: "Create blog successfully!"
            })  
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async Update(req,res,next) {
        try {
            const id = req.params.id;
            const data = req.body
            const updatePro = await BlogModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            }).exec();
            await updatePro.save();
            return res.status(200).json({
                msg: "Update success",
                blog: data
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async DeleteSoft(req,res,next) {
        try {
            const id = req.params.id;
            let updatePro = await BlogModel.findOne({
                _id: id,
                deleted: false
            }).exec();
            if(!updatePro) {
                return res.status(203).json({
                    msg: "Not exits product",
                })
            }
            updatePro.deleted = true;
            await updatePro.save();
            return res.status(200).json({
                msg: "Delete soft successfully",
                data: updatePro
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async Delete(req,res,next) {
        try {
            const id = req.params.id;
            const pro = await BlogModel.findById(id).exec();
            if(pro == null) {
                return res.status(202).json({
                    msg: "Not exists product"
                })
            }
            await BlogModel.findByIdAndDelete(id, {
                new: true,
                runValidators: true,
            }).exec();
            const proDelete = await BlogModel.findById(id).exec();
            return proDelete == null ? res.status(202).json({
                msg: "Delete product successfully!",
            }) : res.status(401).json({
                msg: "Delete product unsuccessfully!",
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async FindById(req,res,next) {
        try {
            const _id = req.query.id;
            const Blog = await BlogModel.findOne(
                {
                    _id: _id,
                    deleted: false
                }
            ).populate({
                path: 'AuthorId',
                model: 'accountusers',
                select: 'username'
            }).populate(
                {
                    path: 'TopicId',
                    model: 'Topics',
                    select: 'topicName'
                }
            ).exec()
           
            if(Blog == null) {
                return res.status(203).json({
                    msg: "Not exits blog",
                    status: 203
                })
            } else {
                return res.status(200).json({
                    msg: "Get products successfully!",
                    data: Blog,
                    status: 200
                });
            }
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async FindByAccount(req,res,next) {
        try {
            const _id = req.query.accountId;
            const Blog = await BlogModel.findOne(
                {
                    deleted: false,
                    accountId: _id
                }
            ).exec();
            if(Blog == null) {
                return res.status(203).json({
                    msg: "Not exits blog",
                    status: 203
                })
            }
            return res.status(200).json({
                data: Blog,
                status: 200,
                msg: "Get the blog successfully!"
            })
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }


    async FindBlogBy(req,res,next) {
        try {
            const _id = req.query.AuthorId;
            const Blog = await BlogModel.findOne(
                {
                    deleted: false,
                    AuthorId: _id
                }
            ).exec();
            if(Blog == null) {
                return res.status(203).json({
                    msg: "Not exits blog",
                    status: 203
                })
            }
            return res.status(200).json({
                data: Blog,
                status: 200,
                msg: "Get the blog successfully!"
            })
        } catch(error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }


    async FindBlogByTittle(req,res,next) {
        try {
            const title = req.query.title;
            const regex = new RegExp(title, 'i');
            const page = parseInt(req.query.pageIndex) || 1; 
            const limit = parseInt(req.query.pageSize) || 10; 
            const skip = (page - 1) * limit;
            
            const query = { Title: { $regex: regex } };
            
            const list = await BlogModel.find(query)
            .skip(skip)
            .limit(limit).exec();
            var newListv1 = [];
            for(const item of list) {
                let author =  await AccountUserModel.findOne({
                        _id : item.AuthorId
                }).exec();
                let topic = await toipicontrol.SearchTopic(item.TopicId);
                newListv1.push({
                    blog: item,
                    author: author,
                    topicInfor: topic
                })
            }
            const totalItem = await BlogModel.find(query).countDocuments();
            const totalPage = Math.ceil(totalItem / limit);
            res.status(200).json({ 
                msg: "Get products successfully!",
                totalItem: totalItem,
                pageSize: limit,
                pageIndex: page,
                products: newListv1,
                totalPage: totalPage
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi tìm kiếm bài đăng." });
        }
    }
}
export default BlogController