require('dotenv').config();

const tableName = process.env.TABLE_NAME;
const {
    getDataService,
    getDataByIdService,
    insertDataService,
    patchDataService,
    deleteDataService
} = require('../services/service')


const getDataController = async(req, res) => {
    try {
        const result = await getDataService(`SELECT * FROM ${tableName}`)
        res.status(200).send(result.rows.length>0? result.rows : "There is no data.")
    } catch (error) {
        res.status(500).send(result)
    }
}

const getDataByIdController = async(req, res) => {
    const id = req.params.id;
    try {
        const result = await getDataByIdService(`SELECT * FROM ${tableName} WHERE ID=${id}`)
        res.status(200).send(result.rows.length>0? result.rows : "There is no data.")
    } catch (error) {
        res.status(500).send(error.message)
    }
};


const insertDataController = async(req, res) => {
    const { name, email, password, confirmPassword, bio } = req.body;
    if(!(name && email && password && confirmPassword)){
        return res.status(400).send("Insufficient information.")
    }
    if(password !== confirmPassword){
        return res.status(400).send("Password does not match.")
    }
    const command = `INSERT INTO ${process.env.TABLE_NAME}(name, email, password, bio) VALUES('${name}','${email}','${password}','${bio}')`
    try {
        const result = await insertDataService(command)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
};


const patchDataController = async(req, res) => {
    let content = [];
    for(var i in req.body){
      content.push(`${i}='${req.body[i]}'`)
    }
    content = content.join(",")
    console.log(content)
    const id = req.params.id
    const command = `UPDATE ${process.env.TABLE_NAME} SET ${ content } WHERE  id=${id}`  
    try {
        const result = await patchDataService(command)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
};


const deleteDataController = async(req, res) => {
    const id = req.params.id;
    const command = `DELETE FROM ${tableName} WHERE ID=${ id }`
    try {
        const result = await deleteDataService(command)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
};


module.exports = {
    getDataController,
    getDataByIdController,
    insertDataController,
    patchDataController,
    deleteDataController
}