import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeSelector,
  getEmployeeByid,
} from "../../../features/employeeSlice";
import { useParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import { AddExperienceModal } from "../../../components/modals/AddExperienceModal";
import "../styles/formAddFamily.css";

const mockExperience = [
  {
    id : 1,
    nama: "Pt. Mencari Cinta Sejati",
    posisi: "Manager",
    alamat: "Jakarta selatan",
    tipe: "kontrak",
    tanggal_masuk: "2022",
    tanggal_keluar: "2023",
  },
];

const FormAddExperience = () => {
  const { id } = useParams();
  const employee = useSelector(employeeSelector.selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeByid(id));
  }, [dispatch, id]);

  const handleAddFamilySubmit = async (payload) => {
    try {
      for (let i = 0; i < payload.length; i++) {
        console.log(payload[i]);
      }
      dispatch(getEmployeeByid(id));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleDeleteExperience = async (expreinceId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // await dispatch(deleteFamily(educationId)).unwrap();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(getEmployeeByid(id));
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <>
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          <div className="title-add-family">Riwayat Kerja</div>
          <hr></hr>
          {mockExperience.map((o) => (
            <Table striped>
              <thead>
                <tr>
                  <th>Nama Perusahaan</th>
                  <th>Posisi</th>
                  <th>Alamat</th>
                  <th>Tipe</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{o.nama}</td>
                  <td>{o.posisi}</td>
                  <td>{o.alamat}</td>
                  <td>{o.tipe}</td>
                  <td>{o.tanggal_masuk}</td>
                  <td>
                    {o.tanggal_keluar}{" "}
                    <TiDelete
                      color="red"
                      size={30}
                      onClick={() => handleDeleteExperience(o.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          ))}
          <AddExperienceModal onSubmit={handleAddFamilySubmit} />
        </Card.Body>
      </Card>
    </>
  );
};

export default FormAddExperience;
