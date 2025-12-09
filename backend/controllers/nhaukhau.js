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

export const addNhanKhau = (req,res) => {
    var {hoten,bietdanh,ngaysinh,gioitinh,noisinh,nguyenquan,diachi,dantoc,tongiao,quoctich,hochieu,nghenghiep,noilamviec,cccd,ngaycap,noicap,ngaychuyenden,noithuongtrutruoc,quanhe,mahokhau} = req.body
    if(ngaycap==='')ngaycap = null;
    if(ngaychuyenden==='')ngaychuyenden = null;
    db.query(
        'INSERT INTO nhankhau ("hoten","bietdanh","ngaysinh","gioitinh","noisinh","nguyenquan","diachi","dantoc","tongiao","quoctich","hochieu","nghenghiep","noilamviec","cccd","ngaycap","noicap","ngaychuyenden","noithuongtrutruoc","quanhe","mahokhau") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
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
            parseInt(mahokhau)
        ],
        (error,results) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json({status:"Thành công",nhankhau:results.rows[0]})
            }
        }
    )
}


export const deleteNhanKhau = (req,res) => {
    db.query(
        'DELETE FROM nhankhau WHERE $1=0 OR "id"=ANY($2)',
        [req.body.length,req.body],
        (error) => {
            if(error) {
                res.status(500).send(error.message)
            } else {
                res.json("Xóa nhân khẩu thành công")
            }
        }
    )
}