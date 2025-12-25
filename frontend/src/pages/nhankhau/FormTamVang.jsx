import React, { useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import './FormS.css'

const FormTamVang = ({ data, close, setList }) => {

  const variants = {
    open: { backgroundColor: "rgba(0,0,0,0.6)" },
    closed: { backgroundColor: "rgba(0,0,0,0)" },
  };
  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const { Formik } = formik;

  // Schema Validation
  const schema = yup.object().shape({
    idnguoitamvang: yup.string().required("Vui lòng nhập ID người tạm vắng"),
    
    ngaybatdau: yup.string()
      .required('Vui lòng nhập ngày bắt đầu')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng phải là yyyy-mm-dd')
      .test('valid-date', 'Ngày không hợp lệ', function (value) {
        if (!value) return true;
        const [year, month, day] = value.split('-');
        return !isNaN(Date.parse(`${month}/${day}/${year}`));
      }),

    ngayketthuc: yup.string()
      .required('Vui lòng nhập ngày kết thúc')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng phải là yyyy-mm-dd')
      .test('valid-date', 'Ngày không hợp lệ', function (value) {
        if (!value) return true;
        const [year, month, day] = value.split('-');
        return !isNaN(Date.parse(`${month}/${day}/${year}`));
      })
      // Quan trọng: Kiểm tra ngày kết thúc phải sau ngày bắt đầu
      .test('is-after-start', 'Ngày kết thúc phải sau ngày bắt đầu', function (ngayketthuc) {
        const { ngaybatdau } = this.parent;
        if (!ngaybatdau || !ngayketthuc) return true; 
        return new Date(ngayketthuc) >= new Date(ngaybatdau);
      }),

    nguyennhan: yup.string().required("Vui lòng nhập lý do tạm vắng")
  });

  const onSubmitForm = async (values) => {
    try {
        // Gửi API thêm tạm vắng
        const res = await axios.post("http://localhost:4000/api/tamvang/add", values);
        if(res.data === "Thành công"){
            alert("Thêm tạm vắng thành công");
            close();
            // Reload lại trang hoặc cập nhật list nếu cần
            window.location.reload(); 
        }
    } catch (err) {
        console.error(err);
        alert("Lỗi khi thêm tạm vắng: " + (err.response?.data || err.message));
    }
  }

  // Tự động điền ID người đang chọn vào form
  const initialValues = {
      idnguoitamvang: data.id || '', 
      ngaybatdau: '',
      ngayketthuc: '',
      nguyennhan: ''
  }

  return (
    <motion.div className="overlay" key="overlay"
      variants={variants} initial={"closed"} 
      onClick={close} animate={"open"} exit={"closed"}  
    >
      <motion.div className="modal" variants={modalVariants} onClick={(e) => e.stopPropagation()} >

      <motion.button className="modal__close-wrapper" whileHover={{ scale: 1.2 }} onClick={close} >
        <IoCloseCircleOutline className="modal__close-icon" />
      </motion.button>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmitForm}
        initialValues={initialValues}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Đăng ký tạm vắng</Form.Label>
            <Form.Text className="text-muted w-100 text-center d-block">
                Cho nhân khẩu: <b>{data.hoten}</b> (ID: {data.id})
            </Form.Text>
          </Form.Group>

          {/* ID Người tạm vắng (Ẩn hoặc Disable vì đã lấy từ data) */}
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Mã nhân khẩu</Form.Label>
              <Form.Control name="idnguoitamvang"
                type="text"
                disabled
                value={values.idnguoitamvang}
              />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày bắt đầu (yyyy-mm-dd)</Form.Label>
                <Form.Control name="ngaybatdau"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngaybatdau}
                  isValid={touched.ngaybatdau && !errors.ngaybatdau}
                  isInvalid={touched.ngaybatdau && !!errors.ngaybatdau}
                />
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaybatdau}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày kết thúc (yyyy-mm-dd)</Form.Label>
                <Form.Control name="ngayketthuc"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngayketthuc}
                  isValid={touched.ngayketthuc && !errors.ngayketthuc}
                  isInvalid={touched.ngayketthuc && !!errors.ngayketthuc}
                />
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngayketthuc}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Lý do tạm vắng</Form.Label>
              <Form.Control name="nguyennhan"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nguyennhan}
                isValid={touched.nguyennhan && !errors.nguyennhan}
                isInvalid={touched.nguyennhan && !!errors.nguyennhan}
              />
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.nguyennhan}</Form.Control.Feedback>
            </Form.Group>
          </Row>
        
          <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
            <button className="button-89" type="submit" onClick={handleSubmit}>Xác nhận</button>
          </Form.Group>

        </Form>
      )}
      </Formik>
    </motion.div>
  </motion.div>
  );
};

export default FormTamVang;