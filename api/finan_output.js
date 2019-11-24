module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const finanOutput = { ...req.body }
    if(req.params.id) finanOutput.id = req.params.id
    
    try {
      existsOrError(finanOutput.id_user, 'Necessário Informar a quem pertence!');
      existsOrError(finanOutput.name, 'Necessário Informar o nome');
      existsOrError(finanOutput.date, 'Necessário informar da data de entrada');
      existsOrError(finanOutput.output, 'Necessário informa a saída');
      existsOrError(finanOutput.value, 'Necessário informar o valor');
      existsOrError(finanOutput.description, 'Necessário informar a descrição');
    } catch(msg) {
      return res.status(400).send(msg);
    }

    if(finanOutput.id) {
      app.db('finan_output')
        .update(finanOutput)
        .where({ id: finanOutput.id })
        .then(_ => res.status(204).send())
        .catch(res.status(500).send(err))
    } else {
      app.db('finan_output')
        .insert(finanOutput)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('finan_output')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Saída não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

  const get = (req, res) => {
    app.db('finan_output')
      .select('id', 'name', 'date', 'output', 'value', 'description')
      .then(finanOutput => res.json(finanOutput))
      .catch(err => res.status(500).send(err))
  }

  return { save, remove, get }
}

