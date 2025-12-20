import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; 
import Form from 'react-bootstrap/Form';

import FormNhanKhau from './FormNhanKhau';
import FormChiTiet from './FormChiTiet';
import FormKhaiTu from './FormKhaiTu';
import FormTamVang from './FormTamVang';
import FormTachHoKhau from './FormTachHoKhau';

import './FormS.css';

const NhanKhau = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalType, setModalType] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/nhankhau/get');
      const rawData = res.data || []; 
      setData(rawData.sort((a, b) => a.mahokhau - b.mahokhau));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  const tableMock = {
    toggleAllRowsSelected: (val) => setSelectedRows([])
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleOpenModal = (type) => {
    if (['EDIT', 'DETAIL', 'KHAITU', 'TAMVANG'].includes(type)) {
      if (selectedRows.length !== 1) {
        alert("Vui lòng chỉ chọn 1 người để thực hiện thao tác này!");
        return;
      }
    }
    if (type === 'TACHHO' && selectedRows.length < 1) {
      alert("Vui lòng chọn ít nhất 1 người để tách hộ!");
      return;
    }
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const getSelectedData = () => {
    return data.find(item => item.id === selectedRows[0]) || {};
  };

  const getSelectedDataList = () => {
    return data.filter(item => selectedRows.includes(item.id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quản Lý Nhân Khẩu</h2>

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
        <Button variant="primary" onClick={() => setModalType('ADD_HK')}>Thêm Hộ Khẩu</Button>
        <Button variant="success" onClick={() => setModalType('ADD_NK')}>Thêm Nhân Khẩu</Button>
        <Button variant="warning" onClick={() => handleOpenModal('EDIT')}>Sửa</Button>
        <Button variant="info" onClick={() => handleOpenModal('DETAIL')}>Chi Tiết</Button>
        <Button variant="secondary" onClick={() => handleOpenModal('TACHHO')}>Tách Hộ</Button>
        <Button variant="dark" onClick={() => handleOpenModal('TAMVANG')}>ĐK Tạm Vắng</Button>
        <Button variant="danger" onClick={() => handleOpenModal('KHAITU')}>ĐK Khai Tử</Button>
      </div>

      <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chọn</th>
              <th>ID</th>
              <th>Họ Tên</th>
              <th>Ngày Sinh</th>
              <th>Giới Tính</th>
              <th>Địa Chỉ</th>
              <th>Mã Hộ Khẩu</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => handleSelectRow(item.id)} 
                style={{
                    cursor: 'pointer', 
                    backgroundColor: selectedRows.includes(item.id) ? '#d1e7dd' : 'inherit'
                }}
              >
                <td>
                  <Form.Check 
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                    onClick={(e) => e.stopPropagation()} 
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.hoten}</td>
                <td>{item.ngaysinh}</td>
                <td>{item.gioitinh}</td>
                <td>{item.diachi}</td>
                <td>{item.mahokhau}</td>
                {}
                <td style={{color: item.trangthai === 'Khai tử' ? 'red' : item.trangthai === 'Tạm vắng' ? 'orange' : 'inherit'}}>
                    {item.trangthai || "Thường trú"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <AnimatePresence>
        {modalType === 'ADD_HK' && (
          <FormNhanKhau 
            close={handleCloseModal} 
            data={{ mahokhau: 'Không điền', manhankhau: '' }}
            setList={setData} 
            table={tableMock}
          />
        )}
        
        {modalType === 'ADD_NK' && (
           <FormNhanKhau 
             close={handleCloseModal} 
             data={{ mahokhau: '', manhankhau: '' }}
             setList={setData} 
             table={tableMock}
           />
        )}

        {modalType === 'EDIT' && (
          <FormNhanKhau 
            close={handleCloseModal} 
            data={getSelectedData()} 
            setList={setData} 
            table={tableMock}
          />
        )}

        {modalType === 'DETAIL' && (
          <FormChiTiet 
            close={handleCloseModal} 
            data={getSelectedData()} 
          />
        )}

        {modalType === 'KHAITU' && (
          <FormKhaiTu 
            close={handleCloseModal} 
            data={getSelectedData()}
            List={data} 
            setList={setData}
          />
        )}

        {modalType === 'TAMVANG' && (
          <FormTamVang 
            close={handleCloseModal} 
            data={getSelectedData()}
            setList={setData}
          />
        )}

        {modalType === 'TACHHO' && (
          <FormTachHoKhau 
            close={handleCloseModal} 
            data={getSelectedDataList()} 
            setList={setData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NhanKhau;