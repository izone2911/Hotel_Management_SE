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

export const _update = (req,res) => {
    const {id,hoten,bietdanh,ngaysinh,gioitinh,noisinh,nguyenquan,diachi,dantoc,tongiao,quoctich,hochieu,nghenghiep,noilamviec,cccd,ngaycap,noicap,ngaychuyenden,noithuongtrutruoc,quanhe,mahokhau} = req.body

    const query = 
        'UPDATE "nhankhau" SET "hoten"=$1,"bietdanh"=$2,"ngaysinh"=$3,"gioitinh"=$4,"noisinh"=$5,"nguyenquan"=$6,"diachi"=$7,"dantoc"=$8,"tongiao"=$9,"quoctich"=$10,"hochieu"=$11,"nghenghiep"=$12,"noilamviec"=$13,"cccd"=$14,"ngaycap"=$15,"noicap"=$16,"ngaychuyenden"=$17,"noithuongtrutruoc"=$18,"quanhe"=$19,"mahokhau"=$20 WHERE "id"=$21'
    db.query(
        query,
        [
            hoten,
            bietdanh,
            ngaysinh,
            gioitinh,
            noisinh,
            nguyenquan,
            diachi,
            dantoc,
            tongiao,
            quoctich,
            hochieu,
            nghenghiep,
            noilamviec,
            cccd,
            ngaycap,
            noicap,
            ngaychuyenden,
            noithuongtrutruoc,
            quanhe,
            parseInt(mahokhau),
            parseInt(id)
        ],
        (error) => {
            if(error) {
                res.status(500).send("Lỗi server - updateNhanKhauById")
            } else {
                res.json("Cập nhật nhân khẩu thành công")
            }
        }
    )
}
