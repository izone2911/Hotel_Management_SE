import db from "../db.js"

export const getNhanKhau = (req,res) => {
    db.query(
        'SELECT * FROM nhankhau WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error, results) => {
            if(error) {
                res.status(500).send("Lỗi server - getNhanKhau")
            } else {
                const nhankhau = results.rows
                res.json(nhankhau)
            }
        }
    )
}