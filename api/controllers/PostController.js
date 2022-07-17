const PostService = require('../services/PostService')

const PostController = {
  async index(req, res){
    const { user_id } =  req.params
    const posts = await PostService.findAllByUser(user_id);
    res.status(200).json(posts);
  },
  async show(req, res){
    const { user_id, id } = req.params
    const post = await PostService.findOneByUser(user_id, id)

    if(!post)
      return res.status(400).json({error: 'Post não encontrado'})

    res.status(200).json(post);
  },
  async create(req, res){
    const { user_id } =  req.params
    await PostService.create(user_id, req.body)
    res.status(204).send()
  },
  async update(req, res){
    const { user_id, id } = req.params
    const [ hasUpdated ] = await PostService.update(user_id, id, req.body)

    if(!hasUpdated)
      return res.status(400).json({error: 'Falha ao editar post'})

    const post = await PostService.findOneByUser(user_id, id)
    res.status(200).json(post);
  },
  async delete(req, res){
    const { id } =  req.params
    await PostService.delete(id)
    res.status(200).json({id});
  }
}

module.exports = PostController;