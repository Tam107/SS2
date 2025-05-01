import Document from "../models/Document.js";
export const getDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(200).json({
                success: false,
                message: "Document not found"
            });
        }
        res.status(200).json({
            success: true,
            data: document,
        });
    } catch (error) {
        console.log(error);
        
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}