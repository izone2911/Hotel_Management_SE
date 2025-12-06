-- Adminer 5.4.0 PostgreSQL 15.14 dump

DROP VIEW IF EXISTS "hokhau";
CREATE TABLE "hokhau" ("mahokhau" bigint, "tenchuho" character varying(100), "thanhvien" bigint, "diachi" character varying(100));


DROP TABLE IF EXISTS "khaitu";
DROP SEQUENCE IF EXISTS khaitu_id_seq;
CREATE SEQUENCE khaitu_id_seq INCREMENT 1 MINVALUE 2 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."khaitu" (
    "id" integer DEFAULT nextval('khaitu_id_seq') NOT NULL,
    "idnguoikhai" character varying(100) NOT NULL,
    "idnguoichet" character varying(100) NOT NULL,
    "ngaychet" date NOT NULL,
    "nguyennhan" character varying(100) NOT NULL,
    CONSTRAINT "khaitu_pk" PRIMARY KEY ("id")
)
WITH (oids = false);


DROP TABLE IF EXISTS "khoanthu";
DROP SEQUENCE IF EXISTS khoanthu_id_seq;
CREATE SEQUENCE khoanthu_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."khoanthu" (
    "id" integer DEFAULT nextval('khoanthu_id_seq') NOT NULL,
    "ten" character varying(255) NOT NULL,
    "loai" character varying(255) NOT NULL,
    "sotien" bigint,
    CONSTRAINT "khoanthu_pk" PRIMARY KEY ("id")
)
WITH (oids = false);

INSERT INTO "khoanthu" ("id", "ten", "loai", "sotien") VALUES
(1,	'Vệ sinh',	'Bắt buộc',	100000),
(2,	'Ủng hộ quỹ người nghèo',	'Tự nguyện',	0),
(3,	'Dọn dẹp môi trường',	'Bắt buộc',	100000),
(5,	'Tham gia công tác xây dựng cộng đồng',	'Bắt buộc',	100000),
(6,	'Hỗ trợ nạn nhân thiên tai',	'Tự nguyện',	0),
(7,	'Giảm chất lượng ô nhiễm',	'Bắt buộc',	100000),
(8,	'Tham gia chương trình giáo dục cộng đồng',	'Tự nguyện',	0),
(9,	'Chăm sóc người già và trẻ em',	'Bắt buộc',	100000),
(10,	'Thiết lập quỹ học bổng',	'Tự nguyện',	0),
(11,	'Phí dịch vụ chung cư',	'Bắt buộc',	495000),
(12,	'Phí quản lý chung cư',	'Bắt buộc',	210000),
(4,	'Quỹ vì biển đảo quê hương',	'Tự nguyện',	0);

DROP TABLE IF EXISTS "nhankhau";
DROP SEQUENCE IF EXISTS nhankhau_id_seq;
CREATE SEQUENCE nhankhau_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."nhankhau" (
    "id" integer DEFAULT nextval('nhankhau_id_seq') NOT NULL,
    "hoten" character varying(100) NOT NULL,
    "bietdanh" character varying(100),
    "ngaysinh" date NOT NULL,
    "gioitinh" character varying(100) NOT NULL,
    "noisinh" character varying(100) NOT NULL,
    "nguyenquan" character varying(100) NOT NULL,
    "diachi" character varying(100) NOT NULL,
    "dantoc" character varying(100) NOT NULL,
    "tongiao" character varying(100),
    "quoctich" character varying(100) NOT NULL,
    "hochieu" character varying(100),
    "nghenghiep" character varying(100),
    "noilamviec" character varying(100),
    "cccd" character varying(12),
    "ngaycap" date,
    "noicap" character varying(100),
    "ngaychuyenden" date,
    "noithuongtrutruoc" character varying(100),
    "quanhe" character varying(100) NOT NULL,
    "mahokhau" bigint NOT NULL,
    CONSTRAINT "nhankhau_pk" PRIMARY KEY ("id")
)
WITH (oids = false);

INSERT INTO "nhankhau" ("id", "hoten", "bietdanh", "ngaysinh", "gioitinh", "noisinh", "nguyenquan", "diachi", "dantoc", "tongiao", "quoctich", "hochieu", "nghenghiep", "noilamviec", "cccd", "ngaycap", "noicap", "ngaychuyenden", "noithuongtrutruoc", "quanhe", "mahokhau") VALUES
(1,	'Nguyễn Văn A',	'A',	'1990-01-01',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Kỹ sư',	'Hà Nội',	'123456789012',	'2020-01-01',	'Hà Nội',	'2020-01-01',	'Hà Nội',	'Chủ hộ',	240415174),
(2,	'Trần Thị B',	'B',	'1995-02-02',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Công giáo',	'Việt Nam',	NULL,	'Nhân viên văn phòng',	'Hà Nội',	'987654321098',	'2019-02-02',	'Hà Nội',	'2019-02-02',	'Hà Nội',	'Vợ',	240415174),
(3,	'Lê Văn C',	'C',	'2000-03-03',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Sinh viên',	'Hà Nội',	'456789012345',	'2021-03-03',	'Hà Nội',	'2021-03-03',	'Hà Nội',	'Con',	240415174),
(4,	'Nguyễn Thị D',	'D',	'1992-04-04',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Giáo viên',	'Hà Nội',	'654321098765',	'2018-04-04',	'Hà Nội',	'2018-04-04',	'Hà Nội',	'Con',	240415174),
(5,	'Trần Thị E',	'E',	'1998-05-05',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Sinh viên',	'Hà Nội',	'345678901234',	'2022-05-05',	'Hà Nội',	'2022-05-05',	'Hà Nội',	'Bố',	240415174),
(6,	'Lê Thị F',	'F',	'2005-06-06',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Học sinh',	'Hà Nội',	'567890123456',	'2023-06-06',	'Hà Nội',	'2023-06-06',	'Hà Nội',	'Mẹ',	240415174),
(7,	'Nguyễn Văn G',	'G',	'2010-07-07',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Học sinh',	'Hà Nội',	'678901234567',	'2023-07-07',	'Hà Nội',	'2023-07-07',	'Hà Nội',	'Chủ hộ',	571165490),
(8,	'Trần Thị H',	'H',	'2012-08-08',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Học sinh',	'Hà Nội',	'789012345678',	'2023-08-08',	'Hà Nội',	'2023-08-08',	'Hà Nội',	'Con',	571165490),
(9,	'Lê Văn I',	'I',	'2015-09-09',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Học sinh',	'Hà Nội',	'890123456789',	'2023-09-09',	'Hà Nội',	'2023-09-09',	'Hà Nội',	'Con',	571165490),
(10,	'Nguyễn Văn J',	'J',	'1985-10-10',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Kỹ sư',	'Hà Nội',	'123456789012',	'2022-10-10',	'Hà Nội',	'2022-10-10',	'Hà Nội',	'Chủ hộ',	127812481),
(11,	'Trần Thị K',	'K',	'1990-11-11',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Công giáo',	'Việt Nam',	NULL,	'Nhân viên văn phòng',	'Hà Nội',	'987654321098',	'2021-11-11',	'Hà Nội',	'2021-11-11',	'Hà Nội',	'Chủ hộ',	739418373),
(12,	'Lê Văn L',	'L',	'1995-12-12',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Sinh viên',	'Hà Nội',	'456789012345',	'2020-12-12',	'Hà Nội',	'2020-12-12',	'Hà Nội',	'Anh',	739418373),
(13,	'Nguyễn Thị M',	'M',	'1992-01-13',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Giáo viên',	'Hà Nội',	'654321098765',	'2019-01-13',	'Hà Nội',	'2019-01-13',	'Hà Nội',	'Vợ',	739418373),
(14,	'Trần Thị N',	'N',	'1998-02-14',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Sinh viên',	'Hà Nội',	'345678901234',	'2023-02-14',	'Hà Nội',	'2023-02-14',	'Hà Nội',	'Em',	739418373),
(15,	'Lê Thị O',	'O',	'2005-03-15',	'Nữ',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Học sinh',	'Hà Nội',	'567890123456',	'2023-03-15',	'Hà Nội',	'2023-03-15',	'Hà Nội',	'Em',	739418373),
(16,	'Lê Văn C',	'C',	'2000-03-30',	'Nam',	'Hà Nội',	'Hà Nội',	'Hà Nội',	'Kinh',	'Phật giáo',	'Việt Nam',	NULL,	'Sinh viên',	'Hà Nội',	'456789012345',	'2021-03-03',	'Hà Nội',	'2021-03-30',	'Hà Nội',	'Chủ hộ',	341498103);

DROP TABLE IF EXISTS "noptien";
DROP SEQUENCE IF EXISTS noptien_id_seq;
CREATE SEQUENCE noptien_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."noptien" (
    "id" integer DEFAULT nextval('noptien_id_seq') NOT NULL,
    "mahokhau" bigint NOT NULL,
    "makhoanthu" integer NOT NULL,
    "sotien" bigint,
    "ngaynop" date NOT NULL,
    CONSTRAINT "noptien_pk" PRIMARY KEY ("id")
)
WITH (oids = false);

INSERT INTO "noptien" ("id", "mahokhau", "makhoanthu", "sotien", "ngaynop") VALUES
(1,	240415174,	1,	500000,	'2023-12-01'),
(2,	571165490,	1,	1000000,	'2023-12-02'),
(3,	127812481,	1,	750000,	'2023-12-03'),
(4,	571165490,	2,	250000,	'2023-12-04'),
(5,	341498103,	2,	400000,	'2023-12-05'),
(6,	240415174,	3,	800000,	'2023-12-06'),
(7,	571165490,	4,	1500000,	'2023-12-07'),
(8,	240415174,	5,	300000,	'2023-12-08'),
(9,	341498103,	6,	600000,	'2023-12-09'),
(10,	341498103,	7,	200000,	'2023-12-10'),
(11,	341498103,	1,	100000,	'1975-03-03');

DROP TABLE IF EXISTS "roles";
CREATE TABLE "public"."roles" (
    "RoleId" integer NOT NULL,
    "Role" character varying(45) NOT NULL,
    CONSTRAINT "roles_pkey" PRIMARY KEY ("RoleId")
)
WITH (oids = false);

INSERT INTO "roles" ("RoleId", "Role") VALUES
(1,	'Quản trị viên'),
(0,	'Ban quản trị');

DROP TABLE IF EXISTS "tamtru";
DROP SEQUENCE IF EXISTS tamtru_id_seq;
CREATE SEQUENCE tamtru_id_seq INCREMENT 1 MINVALUE 2 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tamtru" (
    "id" integer DEFAULT nextval('tamtru_id_seq') NOT NULL,
    "hoten" character varying(100) NOT NULL,
    "ngaysinh" date NOT NULL,
    "gioitinh" character varying(100) NOT NULL,
    "cccd" character varying(12),
    "quequan" character varying(100) NOT NULL,
    "diachi" character varying(255),
    "ngaybatdau" date,
    "ngayketthuc" date,
    CONSTRAINT "tamtru_pk" PRIMARY KEY ("id")
)
WITH (oids = false);

INSERT INTO "tamtru" ("id", "hoten", "ngaysinh", "gioitinh", "cccd", "quequan", "diachi", "ngaybatdau", "ngayketthuc") VALUES
(2,	'Nguyen Van A',	'1990-01-01',	'Nam',	'123456789012',	'Ha Noi',	'Quan 1, TP. Ho Chi Minh',	'2022-01-01',	'2022-12-31'),
(3,	'Tran Thi B',	'1995-05-15',	'Nu',	'987654321098',	'Da Nang',	'Quan 2, TP. Ho Chi Minh',	'2022-02-01',	'2022-11-30'),
(4,	'Le Van C',	'1988-07-10',	'Nam',	'111222333444',	'Hai Phong',	'Quan 3, TP. Ho Chi Minh',	'2022-03-01',	'2022-10-31'),
(5,	'Pham Thi D',	'1992-09-20',	'Nu',	'555666777888',	'Can Tho',	'Quan 4, TP. Ho Chi Minh',	'2022-04-01',	'2022-09-30'),
(6,	'Hoang Van E',	'1985-12-25',	'Nam',	'999000111222',	'Vung Tau',	'Quan 5, TP. Ho Chi Minh',	'2022-05-01',	'2022-08-31'),
(7,	'Nguyen Thi F',	'1998-03-08',	'Nu',	'333444555666',	'Binh Duong',	'Quan 6, TP. Ho Chi Minh',	'2022-06-01',	'2022-07-31'),
(8,	'Tran Van G',	'1980-06-30',	'Nam',	'777888999000',	'Long An',	'Quan 7, TP. Ho Chi Minh',	'2022-07-01',	'2022-06-30'),
(9,	'Le Thi H',	'1993-11-12',	'Nu',	'123987456654',	'Tay Ninh',	'Quan 8, TP. Ho Chi Minh',	'2022-08-01',	'2022-05-31'),
(10,	'Pham Van I',	'1982-04-18',	'Nam',	'456789123000',	'Bac Lieu',	'Quan 9, TP. Ho Chi Minh',	'2022-09-01',	'2022-04-30'),
(11,	'Doan Thi K',	'1996-02-28',	'Nu',	'987654321012',	'Tra Vinh',	'Quan 10, TP. Ho Chi Minh',	'2022-10-01',	'2022-03-31');

DROP TABLE IF EXISTS "tamvang";
DROP SEQUENCE IF EXISTS tamvang_id_seq;
CREATE SEQUENCE tamvang_id_seq INCREMENT 1 MINVALUE 2 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tamvang" (
    "id" integer DEFAULT nextval('tamvang_id_seq') NOT NULL,
    "idnguoitamvang" character varying(100) NOT NULL,
    "ngaybatdau" date NOT NULL,
    "ngayketthuc" date NOT NULL,
    "nguyennhan" character varying(100) NOT NULL,
    CONSTRAINT "tamvang_pk" PRIMARY KEY ("id")
)
WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_userid_seq;
CREATE SEQUENCE users_userid_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "UserId" integer DEFAULT nextval('users_userid_seq') NOT NULL,
    "Email" character varying(45) NOT NULL,
    "Password" character varying(45) NOT NULL,
    "RoleId" integer NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("UserId")
)
WITH (oids = false);

INSERT INTO "users" ("UserId", "Email", "Password", "RoleId") VALUES
(12,	'admin5@example.com',	'password5',	1),
(8,	'admin2@example.com',	'password2',	1),
(9,	'admin3@example.com',	'password3',	1),
(7,	'admin1@example.com',	'password1',	1),
(0,	'admin0@example.com',	'password0',	0);

ALTER TABLE ONLY "public"."noptien" ADD CONSTRAINT "noptien_makhoanthu_fkey" FOREIGN KEY (makhoanthu) REFERENCES khoanthu(id) NOT DEFERRABLE;

DROP TABLE IF EXISTS "hokhau";
CREATE VIEW "hokhau" AS SELECT hokhau.mahokhau,
    nhankhau.hoten AS tenchuho,
    hokhau.thanhvien,
    hokhau.diachi
   FROM ( SELECT nhankhau_1.mahokhau,
            count(*) AS thanhvien,
            nhankhau_1.diachi
           FROM nhankhau nhankhau_1
          GROUP BY nhankhau_1.mahokhau, nhankhau_1.diachi) hokhau,
    nhankhau
  WHERE ((nhankhau.mahokhau = hokhau.mahokhau) AND ((nhankhau.quanhe)::text ~~ '%Chủ hộ%'::text));

-- 2025-10-01 17:34:10 UTC