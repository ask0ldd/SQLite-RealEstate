const Host = require('../models/host.model.js')

exports.getAllHosts = async (req, res) => {
    try{
        const hosts = await Host.findAll();
        // console.log("All hosts:", JSON.stringify(hosts, null, 2));
        return res.status(200).json(hosts)
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.getHostById = async (req, res) => {
    try{
        const host = await Host.findOne({where:{id : parseInt(req.params.id)}});
        // console.log("Host:", JSON.stringify(host, null, 2));
        return res.status(200).json(host)
    } catch (error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.postHost = async (req, res) => {
    try{
        const host = await Host.create({firstname : req.host.firstname, lastname : req.host.lastname, picture : req.host.picture})
        console.log("Auto-generated ID:", host.id);
    }catch(error){
        console.error('Error finding the user:', error)
        res.status(500).json({ error: 'Internal server error' })        
    }
}