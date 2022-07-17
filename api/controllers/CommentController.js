const CommentService = require('../services/CommentService')

const CommentController = {
  async index(req, res){
    const { user_id, post_id } =  req.params
    const comments = await CommentService.findAllByPost(user_id, post_id);
    res.status(200).json(comments);
  },
  async create(req, res){
    const { user_id, post_id } =  req.params
    await CommentService.create(user_id, post_id, req.body)
    res.status(204).send();
  },
  async update(req, res){
    const { user_id, post_id, id } = req.params
    const [ hasUpdated ] = await CommentService.update(user_id, post_id, id, req.body)

    if(!hasUpdated)
      return res.status(400).json({error: 'Falha ao editar post'})

    const comment = await CommentService.findOne(user_id, post_id, id)
    res.status(200).json(comment);
  },
  async delete(req, res){
    const { id } =  req.params
    await CommentService.delete(id)
    res.status(200).json({id});
  }
}

module.exports = CommentController;