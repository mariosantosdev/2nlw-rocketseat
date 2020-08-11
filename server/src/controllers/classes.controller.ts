import { Request, Response } from 'express'
import db from '../database/connection'
import Convertor from '../utils/convertHoursToMinutes'

interface IScheduleItem {
    class_id: number,
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(req: Request, res: Response) {
        const filters = req.query
        const week_day = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        if (!filters.subject) { // return res.status(400).json({ error: 'Não foi passado nenhum filtro' })
            db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                    this.from('class_schedule')
                    if (filters.week_day) this.where({ week_day })
                    if (filters.time) {
                        const timeInMinutes = Convertor(time)
                        this.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        this.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                    }
                })
                .join('users', 'classes.teacher_id', '=', 'users.id')
                // .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .select(['classes.*', 'users.name', 'users.lastname', 'users.email', 'users.avatar', 'users.whatsapp'])
                .then(classes => {
                    return res.status(200).send(classes)
                })
                .catch(err => res.status(500).json({ message: 'Ocorreu um erro ao procurar as aulas', error: `${err}` }))
        } else {
            db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                    this.from('class_schedule')
                    if (filters.week_day) this.where({ week_day })
                    if (filters.time) {
                        const timeInMinutes = Convertor(time)
                        this.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        this.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                    }
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.teacher_id', '=', 'users.id')
                // .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
                .select(['classes.*', 'users.name', 'users.lastname', 'users.email', 'users.avatar', 'users.whatsapp'])
                .then(classes => {
                    return res.status(200).send(classes)
                })
                .catch(err => res.status(500).json({ message: 'Ocorreu um erro ao procurar as aulas', error: `${err}` }))
        }

        // res.send(classes)
    }

    async getWithId(req: Request, res: Response) {
        try {
            const id = req.params.id
            let classes

            const getSchedules = await db('class_schedule').where({ class_id: id }).select('week_day', 'from', 'to', 'class_id')
            const getClass = await db('classes').where({ id: getSchedules[0].class_id }).select('title', 'desc', 'subject', 'cost', 'teacher_id')
            const getTeacher = await db('users').where({ id: getClass[0].teacher_id }).select('name', 'lastname', 'email', 'avatar', 'whatsapp')

            classes = { class: getClass[0], schedules: getSchedules, teacher: getTeacher[0] }
            return res.status(200).send(classes)
        } catch (error) {
            res.status(500).json({ message: 'Ocorreu um erro ao procurar as aulas', error: `${error}` })
        }
    }

    async create(req: Request, res: Response) {
        const {
            title,
            desc,
            subject,
            cost,
            schedule
        } = req.body

        const trx = await db.transaction()

        try {
            const user = await trx('users').where({ id: req.user.id })
            if(user[0].bio === null|| user[0].whatsapp === null) return res.status(400).json({message: 'Você precisa completar todo seu perfil para ser um professor.'})

            const insertedClassesIds = await trx('classes').insert({
                title,
                desc,
                subject,
                cost,
                teacher_id: req.user.id
            })

            const class_id = insertedClassesIds[0]
            const classSchedule = schedule.map((item: IScheduleItem) => {
                return {
                    class_id,
                    week_day: item.week_day,
                    from: Convertor(item.from),
                    to: Convertor(item.to)
                }
            })

            await trx.from('class_schedule').insert(classSchedule)
            trx.commit()

            return res.status(201).send()
        } catch (error) {
            console.log(error)
            await trx.rollback()
            return res.status(400).json({
                error: 'Ocorreu um erro inesperado na criação de aulas'
            })
        }


    }
}