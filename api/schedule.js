module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const save = async (req, res) => {
    const schedule = { ...req.body }
    if(req.params.id) schedule.id = req.params.id
    
    try {
      existsOrError(schedule.id_user, 'Necessário Informar a quem pertence!');
      existsOrError(schedule.name, 'Necessário Informar o nome');
      existsOrError(schedule.date, 'Necessário informar da data');
      existsOrError(schedule.hour, 'Necessário informa o horário');
      existsOrError(schedule.description, 'Necessário informar a descrição');
      existsOrError(schedule.place, 'Necessário informar o local');
    } catch(msg) {
      return res.status(400).send(msg);
    }

    if(schedule.id) {
      app.db('schedule')
        .update(schedule)
        .where({ id: schedule.id })
        .then(_ => res.status(204).send())
        .catch(res.status(500).send(err))
    } else {
      app.db('schedule')
        .insert(schedule)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('schedule')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Agenda não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

  const get = (req, res) => {
    app.db('schedule')
      .select('id', 'name', 'date', 'input', 'value', 'description')
      .then(finanInput => res.json(finanInput))
      .catch(err => res.status(500).send(err))
  }

  return { save, remove, get }
}

