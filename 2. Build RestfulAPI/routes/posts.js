const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * Gets all posts
 */
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

/**
 * Gets specific post
 */

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

/**
 * Submits a post
 */
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            description: req.body.description
        });

        const savedPost = await post.save();
        res.status(200).json(savedPost);

    }
    catch (error) {
        res.status(500).json(error);
    }
})

/**
 * Delete a post
 */
router.delete('/:postId', async (req, res) => {
    try {
        const postRemove = await Post.remove({ _id: req.params.postId });
        res.status(200).json(postRemove)
    }
    catch (error) {
        res.status(500).json(error);
    }
})

/**
 * Updates a post
 */
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId }, {
            $set: { title: req.body.title }
        })
        res.status(200).json(updatePost)
    }
    catch (error) {
        res.status(500).json(error);
    }
})

/**
 * Usando Promises
 */
// router.post('/', (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     })

//     //Guarda a base de datos
//     post.save()
//     .then( data => {
//         res.status(200).json(data);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//         console.log(err);
//     })
// })

module.exports = router;