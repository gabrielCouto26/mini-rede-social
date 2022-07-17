const UserService = require('../services/UserService')

const UserController = {
  async index(req, res){
    const users = await UserService.findAll();
    res.status(200).json(users);
  },
  async show(req, res){
    const { id } = req.params
    const user = await UserService.findOne(id)
    
    if(!user)
      return res.status(400).json({error: 'Usuário não encontrado'})
    
    res.status(200).json(user);
  },
  async create(req, res){
    const { name, email } = req.body
    await UserService.create({ name, email })
    res.status(204).send();
  },
  async update(req, res){
    const { id } = req.params
    const { name, email } = req.body
    const [ hasUpdated ] = await UserService.update(id, { name, email })

    if(!hasUpdated)
      return res.status(400).json({error: 'Falha ao editar usuário'})

    const user = await UserService.findOne(id)
    res.status(200).json(user);
  },
  async delete(req, res){
    const { id } = req.params
    await UserService.delete(id)
    res.status(200).json({id});
  }
}

module.exports = UserController;