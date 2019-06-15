const express = require('express');
const appConfig = require("./../config/appConfig")
const blogController = require('../controllers/blog')

const router = express.Router();
const baseUrl = appConfig.apiVersion+'/blogs';

router.get(baseUrl+'/all',blogController.getAllBlogs)
/**
	 * @api {get} /api/v1/blogs/all Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */

router.get(baseUrl+'/view/:blogId',blogController.viewByBlogId)
/**
	 * @api {get} /api/v1/blogs/view/:blogId Get a single blog
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} blogId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					blogId: "string",
					title: "string",
					description: "string",
					bodyHtml: "string",
					views: number,
					isPublished: boolean,
					category: "string",
					author: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

router.get(baseUrl+'/view/byAuthor/:author',blogController.viewByAuthor)
 /**
	 * @api {get} /api/v1/blogs/view/byAuthor/:author Get blogs by author
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} author author of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

router.get(baseUrl+'/view/byCategory/:category',blogController.viewByCategory)

/**
	 * @api {get} /api/v1/blogs/view/byCategory/:category Get blogs by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} category category of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

router.post(baseUrl+'/delete/:blogId',blogController.deleteBlog)

/**
	 * @api {post} /api/v1/blogs/delete/:blogId Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

router.post(baseUrl+'/edit/:blogId',blogController.editBlog)
/**
	 * @api {put} /api/v1/blogs/edit/:blogId Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

router.post(baseUrl+'/create',blogController.createBlog)

/**
	 * @api {post} /api/v1/blogs/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

router.get(baseUrl+'/count/view/:blogId',blogController.increaseBlogView)

/**
	 * @api {get} /api/v1/blogs/count/view/:blogId Increase Blogs Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

module.exports = router;
