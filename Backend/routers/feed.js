const router = require("express").Router();
const imgUpload=require("../imgUpload")
const Feed = require('../model/feed');
const {feedValidation}=require('../validation');
const verify=require("./verify")

router.post('/upload',imgUpload,async (req, res) => {
    
    if(req.file)
    return  res.status(200).send({
        success:true,
        message:req.file}) 
        else{
            return  res.status(400).send({
                success:false,
                message:"something went wrong "}) 
            
        }

});

 

router.post('/',verify,imgUpload,async (req, res) => {

 
    const {error}=feedValidation(req.body);
    if(error) return  res.status(400).send({
        success:false,
        message:error})  
 
    
        const feed = new Feed({
            photo:req.body.photo,
            caption:req.body.caption,
            userId:req.body.userId,
           
        });
    
        try {
    
            await feed.save();
            // res.json({success:true,
            //     message:"Product Inserted successfully", Product:req.Product,
            //     Products})
            return res.send({success:true,
                message:"Users Inserted successfully",feed})
            
    
    
        } catch (err) {
    
            return res.status(400).send({
                success:false,
                message: err})
    
        }
 
    
    })

router.get('/',verify,async (req, res) => {


let {page,size}=req.query
if(!page){
    page=1
}
if(!size){
    size=10
}
const limit=parseInt(size)
const skip=(page-1)*size



   await Feed.find().limit(limit).skip(skip)
//    await Feed.find()
    
    .then(feeds=> {return res.json({success:true,
        message:"feeds retrived successfully",
        feeds})}).catch(error=>res.status(400).json({
            success:false,
                message:error.details[0].message}))
    
  
        })
    
router.put('/:id',verify, async (req, res,next) => { 
      
            // const {error}=feedValidation(req.body);
            // if(error) return  res.status(400).json({
            //     success:false,
            //     message:error.details[0].message})           

            Feed.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        photo:req.body.photo,
                        caption:req.body.caption,
                        like:req.body.like,
                        comment:req.body.comment,
                        
                    }
                },{new:true})
                .then(feed=> {
                   return res.json({success:true,
                        message:"Updated successfully", feed:req.feed,
                        feed})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})
router.delete('/:id',verify,async (req, res) => {

    const user=await Feed.findOne({_id: req.params.id});
    if(!user) return  res.status(400).send("product not Exist!!!")


            await Feed.remove({_id:req.params.id}).then(feeds=> res.json({success:true,
                message:"Users deleted successfully", Feed:req.Feed,
                })).catch(error=>res.json({success:false,
                    message:"Users deleted successfully",Feed:req.Feed,
                    }))
                
   })
    
module.exports = router;