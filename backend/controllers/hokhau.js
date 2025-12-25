import db from "../db.js"

export const _add = (req,res) => {
    var {
        hoten, bietdanh, ngaysinh, gioitinh, noisinh, nguyenquan, diachi,
        dantoc, tongiao, quoctich, hochieu, nghenghiep, noilamviec, cccd,
        ngaycap, noicap, ngaychuyenden, noithuongtrutruoc, quanhe,
        sdt, email, vaitro
    } = req.body
    
    if(!ngaycap || ngaycap==='' || ngaycap === '0000-00-00') ngaycap = null;
    if(!ngaychuyenden || ngaychuyenden==='' || ngaychuyenden === '0000-00-00') ngaychuyenden = null;
    if(!ngaysinh || ngaysinh==='' || ngaysinh === '0000-00-00') ngaysinh = null;

    db.query('SELECT MAX("mahokhau") as max_ma FROM nhankhau', (err, resultMax) => {
        if (err) return res.status(500).send("Lỗi lấy mã hộ khẩu: " + err.message);

        let newMaHoKhau = 1;
        if (resultMax.rows.length > 0 && resultMax.rows[0].max_ma) {
             newMaHoKhau = parseInt(resultMax.rows[0].max_ma) + 1;
        }

        console.log("Tạo hộ khẩu mới với mã: " + newMaHoKhau);

        const sql = `
            INSERT INTO nhankhau (
                "hoten","bietdanh","ngaysinh","gioitinh","noisinh","nguyenquan","diachi",
                "dantoc","tongiao","quoctich","hochieu","nghenghiep","noilamviec","cccd",
                "ngaycap","noicap","ngaychuyenden","noithuongtrutruoc","quanhe","mahokhau",
                "sdt","email","vaitro"
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) 
            RETURNING *
        `;

        const values = [
            hoten, bietdanh, ngaysinh, gioitinh, noisinh, nguyenquan, diachi, 
            dantoc, tongiao, quoctich, hochieu, nghenghiep, noilamviec, cccd, 
            ngaycap, noicap, ngaychuyenden, noithuongtrutruoc, 
            "Chủ hộ",       
            newMaHoKhau,    
            sdt, email, vaitro
        ];

        db.query(sql, values, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).send(error.message)
                } else {
                    res.json({status:"Thành công", nhankhau:results.rows[0]})
                }
            }
        )
    });
}

export const _tach = (req, res) => {
    const { thanhvien, diachi } = req.body; 
    db.query('SELECT MAX("mahokhau") as max_ma FROM nhankhau', [], (error, results) => {
        if (error) {
            console.log("Lỗi tìm Max mã hộ khẩu:", error);
            return res.status(500).send(error.message);
        } else {
            let newMaHoKhau = 1;

            if (results.rows.length > 0 && results.rows[0].max_ma != null) {
                const maxMa = parseInt(results.rows[0].max_ma);
                if (!isNaN(maxMa)) {
                    newMaHoKhau = maxMa + 1;
                }
            }

            console.log("Mã hộ khẩu mới sau khi tách:", newMaHoKhau); // Log kiểm tra

            if (isNaN(newMaHoKhau)) {
                return res.status(500).send("Lỗi: Không thể tạo mã hộ khẩu mới (NaN).");
            }

            let SQL = '';
            
            if (thanhvien && Array.isArray(thanhvien)) {
                thanhvien.forEach((tv) => {
                    SQL += `UPDATE nhankhau SET "mahokhau" = ${newMaHoKhau}, "diachi" = '${diachi}', "quanhe" = '${tv.quanhe}' WHERE "id" = ${tv.id}; `;
                });
            }

            if (SQL !== '') {
                db.query(SQL, [], (err, result) => {
                    if (err) {
                        console.log("Lỗi cập nhật tách hộ:", err);
                        res.status(500).send(err.message);
                    } else {
                        res.json({ status: "Thành công", newMaHoKhau: newMaHoKhau });
                    }
                });
            } else {
                res.json({ status: "Không có thành viên nào được chọn" });
            }
        }
    });
};