module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const members = { ...req.body }
    if(req.params.id) members.id = req.params.id
    
    try {
      existsOrError(members.id_user, 'Necessário Informar a quem pertence!');
      existsOrError(members.name, 'Necessário Informar o nome');
      existsOrError(members.address, 'Necessário informar o endereço');
      existsOrError(members.telephone, 'Necessário informa o telefone');
      existsOrError(members.email, 'Necessário informar o E-mail');
      existsOrError(members.cpf, 'Necessário informar o CPF');
      existsOrError(members.profession, 'Necessário informar a Profissão');
      existsOrError(members.situation, 'Necessário informar a situação');
      existsOrError(members.office, 'Necessário informar a atividade');
    } catch(msg) {
      return res.status(400).send(msg);
    }

    if(members.id) {
      app.db('members')
        .update(members)
        .where({ id: members.id })
        .then(_ => res.status(204).send())
        .catch(res.status(500).send(err))
    } else {
      app.db('members')
        .insert(members)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('members')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Membro não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

  const get = (req, res) => {
    app.db('members')
      .select('id', 'name', 'address', 'telephone', 'email', 'cpf', 'profession', 'situation', 'office')
      .then(members => res.json(members))
      .catch(err => res.status(500).send(err))
  }

  return { save, remove, get }
}

