import { authSecret } from '../../.env'
import { Request, Response } from 'express'
import db from '../database/connection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = authSecret

export default class UsersController {
    async index(req: Request, res: Response) {
        const { email, password } = req.body

        // Verifica se foi passado um email e uma senha
        if (email?.trim() && password) {
            const getUser = await db('users').where({ email }) // Pega o usuario no banco de dados

            // Verifica se encontrou algum usuario no banco de dados
            if (getUser.length >= 1) {
                const getPassword = getUser[0].password // Pega a senha do usuario no banco de dados
                bcrypt.compare(password, getPassword, async (err, match) => {
                    if (err) return res.status(500).json({ message: 'Ocorreu um erro ao fazer login.' })
                    if (!match) return res.status(400).json({ message: 'Informações incorretas.' })

                    // Cria um toke para autenticação do usuario
                    const token = jwt.sign(email, SECRET)

                    // Delete a senha do usuario no objeto
                    delete getUser[0].password
                    return res.status(200).json({ user: getUser[0], token })
                })
            } else {
                return res.status(400).json({ message: 'Usuário inválido.' })
            }
        } else {
            return res.status(400).json({ message: 'Digite um email e uma senha.' })
        }
    }

    async create(req: Request, res: Response) {
        const { name, lastname, email } = req.body

        db('users').where({ email })
            .then(user => {
                if (user[0]) return res.status(400).json({ message: 'Esse e-mail já está cadastrado' })

                bcrypt.hash(req?.body?.password, 10, async (err, password) => {
                    if (err) return res.status(500).json({ message: 'Ocorreu um erro ao criar um usuário' })
                    const trx = await db.transaction()

                    try {
                        await trx('users').insert({
                            name,
                            lastname,
                            email,
                            password,
                            avatar: 'https://i.imgur.com/UBwId58.png',
                        })

                        trx.commit()
                        res.status(200).json({ message: 'Cadastrado com sucesso' })
                    } catch (error) {
                        res.status(500).json({ message: 'Ocorreu um erro ao criar um usuário' })
                    }
                })
            })
            .catch(_ => res.status(500).json({ message: 'Ocorreu um erro ao criar um usuário' }))


    }

    async addFavorite(req: Request, res: Response) {
        const { email } = req.user
        const teacherId = req.params.id

        db('users').where({ email })
            .then(async user => {
                try {
                    let favorites = user[0].favorites
                    let favoritesArray: (string | number)[] = []

                    // Se os favoritos do banco de dados retornar NULL
                    if (favorites == null) {
                        favoritesArray.push(teacherId) // Adicionar o id do professor a lista
                        favorites = favoritesArray.toString() // Converter a lista para string
                    } else {
                        favoritesArray = [favorites] // Converte a string do banco de dados para array

                        // Se no array tiver o id do professor
                        if (favoritesArray.includes(teacherId)) {
                            // Percorre a lista de favoritos
                            favoritesArray.forEach((id, i) => {
                                id == teacherId && favoritesArray.splice(i, 1) // Se o id da lista for igual ao id do professor remova, o id do professor da lista
                            });
                        } else {
                            favoritesArray.push(teacherId) // Adiciona o id do professor na lista
                        }

                        // Se o tamanho da lista for igual a 0, o retorno do favorites vai ser null, se não o retorno vai ser a lista
                        favoritesArray.length == 0 ? favorites = null : favorites = favoritesArray.toString()
                    }

                    const trx = await db.transaction()

                    await trx('users')
                        .where({ id: user[0].id })
                        .update({ favorites })

                    await trx.commit()
                    res.status(201).json()
                } catch (error) {
                    return res.status(500).json({ message: 'Ocorreu um erro salvar esse professor', error: `${error}` })
                }
            })
    }

    async editProfile(req: Request, res: Response) {
        const {
            name,
            lastname,
            email,
            whatsapp,
            bio
        } = req?.body

        if(!name?.trim() && name?.trim() === "") res.status(400).json({message: 'Você deve escrever um nome.'})
        if(!lastname?.trim() && lastname?.trim() === "") res.status(400).json({message: 'Você deve escrever um sobrenome.'})
        if(!email?.trim() && email?.trim() === "") res.status(400).json({message: 'Você deve escrever um e-mail.'})
        if(!whatsapp?.trim() && whatsapp?.trim() === "") res.status(400).json({message: 'Você deve escrever seu whatsapp.'})
        if(!bio?.trim() && bio?.trim() === "") res.status(400).json({message: 'Você deve escrever uma briografia.'})

        await db('users').where({ id: req.user.id }).update(req.body)
            .then(async _ => {
                const user = await db('users').where({ id: req.user.id })
                const token = jwt.sign(user[0].email, SECRET)
                res.status(201).json({ message: 'Perfil atualizado.', token })
            })
            .catch(err => res.status(500).json({ message: 'Ocorreu um erro ao atualizar o perfil', error: `${err}` }))
    }
}