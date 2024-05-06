const { query } = require("express");
const URL = require("../models/url");

const generateShortURL = async (req,res) => {
    try{
        const body = req.body;
        if(!body.url) return res.status(400).json({status:false,error: "URL is required"})
        import("nanoid").then(async nanoid => {
            const shortId = nanoid.nanoid(8)
            await URL.create({
                shortId: shortId,
                redirectUrl: body.url
            })
            return res.status(200).json({status:true,message: "URL created successfully"}) 
        }).catch(error => {
            return res.status(400).json({status:false,error:error})
        });
    }catch(error){
        return res.status(400).json({status:false,error: error})
    }
}

const getAllShortURL = async(req,res) => {
    try{
        const query = req.query;
        if(!query.id) return res.status(400).json({status:false,error:error})
        let result = await URL.findOne({shortId: query.id})
        return res.status(200).json({status:true,message:"Your info get",data:result})
    }catch(error){
        return res.status(400).json({status:false,error:error})
    }
}

const redirectShortURL = async(req,res) => {
    try{
        let result = await URL.findOne({shortId:req.params.shortId});
        return res.redirect(result.redirectUrl);
    }catch(error){
        return res.status(400).json({status:false,error:error})
    }
}

module.exports = {
    generateShortURL,
    getAllShortURL,
    redirectShortURL,
}