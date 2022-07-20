const AuthService = require('../services/AuthService')
const UserService = require('../services/UserService')

const AuthController = {
  async register(req, res){
    const { name, email, password } = req.body;

    const user = await UserService.findByEmail(email)
    if(user) 
      return res.status(200).json({ msg: 'Usuário já cadastrado.' })

    await AuthService.register(name, email, password);
    res.status(204).send();
  },
  async login(req, res){
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email)
    if(!user) 
      return res.status(400).json({ msg: 'Usuário não cadastrado.' })

    const success = await AuthService.login(email, password);
    if(success)
      return res.status(200).json({ user_id: user.id });
    else
      return res.status(400).json({ user_id: 0 });
  }
}

module.exports = AuthController;