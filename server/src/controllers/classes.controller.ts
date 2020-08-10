import { Request, Response } from 'express'
import db from '../database/connection'
import Convertor from '../utils/convertHoursToMinutes'

interface IScheduleItem {
    class_id: number,
    week_day: number,
    from: string,
    to: string
}

export default class ClassesControlle {
    async index(req: Request, res: Response) {
        const filters = req.query
        const week_day = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        if (!filters.week_day || !filters.subject || !filters.time) return res.status(400).json({ error: 'Não foi passado nenhum filtro' })

        const timeInMinutes = Convertor(time)

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('teachers', 'classes.teacher_id', '=', 'teachers.id')
            .select(['classes.*', 'teachers.*'])

        res.send(classes)
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            avatar,
            bio,
            subject,
            cost,
            schedule
        } = req.body

        const trx = await db.transaction()

        try {
            const insertedTeachersIds = await trx('teachers').insert({
                name,
                email,
                avatar: avatar || 'https://i.imgur.com/UBwId58.png',
                whatsapp,
                bio
            })

            const teacher_id = insertedTeachersIds[0]

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                teacher_id
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

            const sche = await trx.from('class_schedule').insert(classSchedule)
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