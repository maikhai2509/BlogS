import 'dotenv/config';
import redis from '../../config/database/redis.js'
import BlogModel from "../../model/Blog.model.js"
import AccountUserModel from "../../model/AccountUser.model.js";
import TopicController from "../Topic/topic.controller.js";
import client from '../../services/redis.service.js'

const toipicontrol = new TopicController();

async function GetBlogbyPage(req, res, next) {
    try {
        let { pageSize, pageIndex, topicId, accountId, roleName } = req.query;
        console.log(`accountId la: ${accountId}`)
        console.log(`roleName la: ${roleName}`)
        console.log(`pageSize la: ${pageSize}`)
        console.log(`pageIndex la: ${pageIndex}`)
        if ((pageSize * 1) <= 0 || !Boolean(pageSize)) {
            pageSize = 10;
        }
        if ((pageIndex * 1) <= 0 || !Boolean(pageIndex)) {
            pageIndex = 1;
        }

        if (pageIndex && pageSize) {
            //list cac post theo ca nhan
            if (roleName === 'user') {
                if (topicId) {
                    var listTong = await BlogModel.find({ deleted: false, TopicId: topicId, AuthorId: accountId }).exec();
                    var list = await BlogModel.find({ deleted: false, TopicId: topicId, AuthorId: accountId }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {
                        let author = await AccountUserModel.findOne({
                            _id: accountId
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
                    if (total <= pageSize) {
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
                    var listTong1 = await BlogModel.find({ deleted: false, AuthorId: accountId }).exec();
                    var list = await BlogModel.find({ deleted: false, AuthorId: accountId }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {
                        let author = await AccountUserModel.findOne({
                            _id: accountId
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
                    if (total <= pageSize) {
                        totalPage = 1
                    } else {
                        totalPage = Math.floor(total / pageSize) + 1;
                    }
                    return res.status(200).json({
                        msg: "Get blogs successfully!",
                        totalItem: total,
                        pageSize: pageSize * 1,
                        pageIndex: pageIndex * 1,
                        products: newListv1,
                        totalPage: totalPage
                    })
                }
            }

            //list post qua admin
            if (accountId == process.env.ADMIN_ID) {
                if (topicId) {
                    var listTong = await BlogModel.find({ deleted: false, TopicId: topicId }).exec();
                    var list = await BlogModel.find({ deleted: false, TopicId: topicId }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {
                        let author = await AccountUserModel.findOne({
                            _id: item.AuthorId
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
                    if (total <= pageSize) {
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
                    var listTong1 = await BlogModel.find({ deleted: false }).exec();
                    var list = await BlogModel.find({ deleted: false }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {

                        let author = await AccountUserModel.findOne({
                            _id: item.AuthorId
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
                    if (total <= pageSize) {
                        totalPage = 1
                    } else {
                        totalPage = Math.floor(total / pageSize) + 1;
                    }
                    return res.status(200).json({
                        msg: "Get blogs successfully!",
                        totalItem: total,
                        pageSize: pageSize * 1,
                        pageIndex: pageIndex * 1,
                        products: newListv1,
                        totalPage: totalPage
                    })
                }

            }

            //list post qua user ko reg
            if (accountId === undefined) {
                console.log('user ko reg')
                if (topicId) {
                    var listTong = await BlogModel.find({ deleted: false, TopicId: topicId }).exec();
                    var list = await BlogModel.find({ deleted: false, TopicId: topicId }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {
                        let author = await AccountUserModel.findOne({
                            _id: item.AuthorId
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
                    if (total <= pageSize) {
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
                    console.log('no topic')
                    var listTong1 = await BlogModel.find({ deleted: false }).exec();
                    var list = await BlogModel.find({ deleted: false }).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                    var newListv1 = [];
                    for (const item of list) {

                        let author = await AccountUserModel.findOne({
                            _id: item.AuthorId
                        }).exec();

                        let topic = await toipicontrol.SearchTopic(item.TopicId);
                        newListv1.push({
                            blog: item,
                            author: author,
                            topicInfor: topic
                        })
                        

                       //set cache 
                       await client.setPromise('BlogPage', JSON.stringify(newListv1) )

                    }
                    let totalPage;
                    let total = listTong1.length;
                    if (total <= pageSize) {
                        totalPage = 1
                    } else {
                        totalPage = Math.floor(total / pageSize) + 1;
                    }          

                    return res.status(200).json({
                        msg: "Get blogs successfully!",
                        totalItem: total,
                        pageSize: pageSize * 1,
                        pageIndex: pageIndex * 1,
                        products: JSON.parse(await client.getPromise('BlogPage')),
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

export default {
    GetBlogbyPage
}


