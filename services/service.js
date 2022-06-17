const pool = require('../db/db')
require('dotenv').config();


const getDataService = async(command) => {
    try {
        return await pool.query(command)
    } catch (error) {
        return error.message;
    }
};


const getDataByIdService = async(command) => {
    try {
        return await pool.query(command)
    } catch (error) {
        return error.message;
    }
};


const insertDataService = async(command) => {
    try {
        await pool.query(command)
        return "Inserted data."
    } catch (error) {
        return error.message;
    }
};


const patchDataService = async(data) => {
    try {
        await pool.query(data)
        return "Updated data."
    } catch (error) {
        return error.message;
    }
};


const deleteDataService = async(data) => {
    try {
        await pool.query(data)
        return "Deleted."
    } catch (error) {
        return error.message;
    }
};



module.exports = {
    getDataService,
    getDataByIdService,
    insertDataService,
    patchDataService,
    deleteDataService
}