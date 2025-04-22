
export const getAdmin = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.admin,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in BE"
        })
    }
}