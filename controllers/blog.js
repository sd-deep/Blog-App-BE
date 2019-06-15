const express = require('express')
const Blog = require('../models/Blog')
const shortid = require('shortid')
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')

exports.createBlog = (req, res, next) => {
    const blogId = shortid.generate()
    const today = time.now()

    const newBlog = new Blog({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    })

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '' ? req.body.tags.split(',') : [])
    newBlog.tags = tags;

    newBlog.save()
        .then(result => {
            logger.info('Blog created successfully','BlogController : createBlog')
            let apiResponse = response.generate(false, 'Blog Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : createBlog', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
            console.log(err)
        })
}


exports.getAllBlogs = (req, res, next) => {
    Blog.find()
        .select('-__v -_id')
        .lean()
        .then(allBlogs => {
            if (allBlogs == undefined || allBlogs == null || allBlogs == '') {
                logger.info('No Blog Found', 'Blog Controller: getAllBlog')
                return res.send('no blog found')
            }
            logger.info("Blog found successfully", "BlogController:ViewBlogById", 5)
            let apiResponse = response.generate(false, 'Blog Found Successfully.', 200, allBlogs)
            return res.send(apiResponse)    
        })
        .catch(err => {
            logger.error(err.message, 'Blog Controller: getAllBlog', 10)
            let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null)
            res.send(apiResponse)
        })
}

exports.viewByBlogId = (req, res, next) => {
    const blogId = req.params.blogId;
    if (check.isEmpty(blogId)) {
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        return res.send(apiResponse)
    }

    Blog.findOne({ blogId: blogId })
        .then(blog => {
            if (blog == undefined || blog == null || blog == '') {
                logger.info('Blog Not Found', 'BlogController : viewByBLogId')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                return res.send(apiResponse)
            }
            logger.info("Blog found successfully", "BlogController:ViewBlogById", 5)
            let apiResponse = response.generate(false, 'Blog Found Successfully.', 200, blog)
            return res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController:ViewBlogById', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })
}

exports.viewByAuthor = (req, res, next) => {
    const author = req.params.author;
    if (check.isEmpty(author)) {
        let apiResponse = response.generate(true, 'author is missing', 403, null)
        res.send(apiResponse)
    }
    Blog.find({ author: author })
        .then(blog => {
            if (blog == undefined || blog == null || blog == '') {
                logger.info('Blog Not Found', 'BlogController : viewByAuthor')
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null)
                return res.send(apiResponse)
            }
            let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, blog)
            return res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : viewByAuthor', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })

}

exports.viewByCategory = (req, res, next) => {
    const category = req.params.category;
    if (check.isEmpty(category)) {
        let apiResponse = response.generate(true, 'category is missing', 403, null)
        return res.send(apiResponse)
    }

    Blog.find({ category: category })
        .then(blog => {
            if (blog == undefined || blog == null || blog == '') {
                logger.info('Blog Not Found', 'BlogController : viewByCategory')
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null)
                return res.send(apiResponse)
            }
            let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, blog)
            return res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : viewByCategory', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })

}


exports.editBlog = (req, res, next) => {

    const blogId = req.params.blogId;
    const reqBody = req.body;
    if (check.isEmpty(blogId)) {
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        return res.send(apiResponse)
    }
    Blog.update({ blogId: blogId }, reqBody, { multi: true })
        .then(result => {
            if (result == undefined || result == null || result == '') {
                logger.info('Blog Not Found', 'BlogController : editBlog')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                return res.send(apiResponse)
            }

            let apiResponse = response.generate(false, 'Blog Edited Successfully.', 200, result)
            return res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : editBlog', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })

}

exports.increaseBlogView = (req, res, next) => {

    const blogId = req.params.blogId;
    if (check.isEmpty(blogId)) {
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        return res.send(apiResponse)
    }

    Blog.findOne({ blogId: blogId })
        .then(blog => {
            if (blog == undefined || blog == null || blog == '') {
                logger.info('No Blog Found', 'Blog Controller: increaseBlogView')
                let apiResponse = response.generate(true, 'No Blog Found', 404, null)
                return res.send(apiResponse)
            }
            blog.views += 1;
            return blog.save()
                .then(result => {
                    logger.info('Blog Updated', 'Blog Controller: increaseBlogView')
                    let apiResponse = response.generate(false, 'Blog Updated', 201, result)
                    return res.send(apiResponse)
                })
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : increaseBlogView ', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })
}


exports.deleteBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    if (check.isEmpty(blogId)) {
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        return res.send(apiResponse)
    }

    Blog.deleteOne({ blogId: blogId })
        .then(result => {
            if (result == undefined || result == null || result == '') {
                logger.info('Blog Not Found', 'BlogController : deleteBlog')
                let apiResponse = response.generate(true, 'Blog Not Found.', 404, null)
                return res.send(apiResponse)

            }
            let apiResponse = response.generate(false, 'Blog Deleted Successfully', 200, result)
            res.send(apiResponse)
        })
        .catch(err => {
            logger.error(`Error Occured : ${err}`, 'BlogController : deleteBlog ', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        })

}