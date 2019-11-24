module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const finanInput = { ...req.body }
    if(req.params.id) finanInput.id = req.params.id
    
    try {
      existsOrError(finanInput.id_user, 'Necessário Informar a quem pertence!');
      existsOrError(finanInput.name, 'Necessário Informar o nome');
      existsOrError(finanInput.date, 'Necessário informar da data de entrada');
      existsOrError(finanInput.input, 'Necessário informa a entrada');
      existsOrError(finanInput.value, 'Necessário informar o valor');
      existsOrError(finanInput.description, 'Necessário informar a descrição');
    } catch(msg) {
      return res.status(400).send(msg);
    }

    if(finanInput.id) {
      app.db('finan_input')
        .update(finanInput)
        .where({ id: finanInput.id })
        .then(_ => res.status(204).send())
        .catch(res.status(500).send(err))
    } else {
      app.db('finan_input')
        .insert(finanInput)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('finan_input')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Entrada não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

  const get = (req, res) => {
    app.db('finan_input')
      .select('id', 'name', 'date', 'input', 'value', 'description')
      .then(finanInput => res.json(finanInput))
      .catch(err => res.status(500).send(err))
  }

  return { save, remove, get }
}

