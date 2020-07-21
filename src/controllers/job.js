const jobModels = require('../models/jobModel')
const authModels = require('../models/authModel')
const { Op } = require("sequelize");
const helper = require('../helpers')
const e = require('express')
// const { delete } = require('../../app')

require('dotenv').config()
const refreshTokens = []
module.exports = {

    getJobs: async function (request, response) {
        try {
            let location = '';
            let date_ob = new Date();
            let thisHours = date_ob.getHours();
            //open at 8 am
            if (thisHours < 8) {
                return helper.response(response, 401, { message: 'jobs still closed, and will Open at 8am' })
            }
            const user = await authModels.findOne({ where: { username: request.token.result.username } });
            if (request.query.location === null || request.query.location === undefined || request.query.location === '') {
                location = user.location;
            }
            else {
                location = request.query.location;
            }
            // current hours

            // let minutes = date_ob.getMinutes();
            // let second = date_ob.getSeconds();

            const all = await jobModels.findAll({
                where: {
                    location: { [Op.like]: `%${location}%` }, availability: user.availability, user_id: {
                        [Op.ne]: null
                    }, isClaimed: 'false'
                }
            })

            const check = await jobModels.findAll({ where: { location: { [Op.like]: `%${location}%` }, availability: user.availability, user_id: user.id, isClaimed: 'false' } })
            if (check && check.length > 5) {
                try {
                    await jobModels.update({ user_id: null }, { where: { user_id: user.id } });

                } catch (error) {
                    console.log('no more jobsss')
                }
            }
            if (user.other_appointment === "none") {
                try {
                    const result = await jobModels.findOne({ where: { location: { [Op.like]: `%${location}%` }, availability: user.availability, user_id: null, isClaimed: 'false' } });
                    // authModels.update({ other_appointment: result.name}, { where: { id: user.id } })

                    for (let i = 0; i < all.length; i++) {
                        //to get limit time, agter 1hour data expire and can see by other
                        if (thisHours >= 8 && thisHours - new Date(all[i].updatedAt).getHours() > 0 && all[i].user_id !== null) {
                            // console.log(new Date(second-all[i].updatedAt).getSeconds());
                            await jobModels.update({ user_id: null }, { where: { user_id: all[i].user_id } }).catch(function (error) {
                                console.error(error)
                            })
                        }
                    }
                    try {
                        await jobModels.update({ user_id: user.id }, { where: { id: result.id } });

                    } catch (error) {
                        console.log('no more job')
                    }
                    result.user_id = user.id;
                    return helper.response(response, 200, result)
                } catch (error) {
                    // if data has reach end, then clear user_id on job for reset mark.
                    try {
                        await jobModels.update({ user_id: null }, { where: { user_id: user.id } });

                    } catch (error) {
                        console.log('no more jobs')
                    }

                    return helper.response(response, 200, { message: 'no more jobs' })
                }

            }

            else {
                return helper.response(response, 404, { message: 'you have another appointment' })

            }

        } catch (error) {
            console.log(error)

            return helper.response(response, 500, error)

        }

    },
    putJob: async function (request, response) {
        try {
            const user = await authModels.findOne({ where: { username: request.token.result.username } });
            // if(user.other_appointment==="none"){
            let isClaimed = request.body.isClaimed;
            const job_id = request.params.id;
            const data = await jobModels.findOne({ where: { id: job_id } });
            console.log(user.other_appointment)

            if (request.token.result.id !== data.user_id) {
                return helper.response(response, 401, { message: "dont have access" })

            }
            jobModels.update({ user_id: null, isClaimed: isClaimed }, { where: { id: job_id } });
            if (isClaimed === "true") {
                authModels.update({ other_appointment: data.name }, { where: { id: user.id } })

                jobModels.update({ isClaimed: isClaimed }, { where: { id: job_id } })
            }

            else {
                jobModels.update({ isClaimed: isClaimed }, { where: { id: job_id } })

            }
            // result.user_id=user.id;
            data.user_id = null;

            return helper.response(response, 200, data)

        } catch (error) {
            console.log(error)

            return helper.response(response, 500, error)

        }

    },
    postJob: async function (request, response) {
        try {
            const addData = request.body

            const result = await jobModels.create(addData)
            return helper.response(response, 200, result)

        } catch (error) {
            // console.log(error)
            return helper.response(response, 500, error)

        }

    },
}














