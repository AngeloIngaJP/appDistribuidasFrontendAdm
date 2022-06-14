import styles from "../styles/SingleProduct.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalEditarPlato } from "../modals/ModalEditarPlato";
import { deleteDishRequest } from "../api/dish";
import { useState } from "react";
import Swal from "sweetalert2";

export const SingleProduct = ({ producto, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState([]);

  const deleteProduct = async () => {
    Swal.fire({
      title: `¿Desea borrar el plato ${producto.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isLoading ? "Eliminando..." : "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        await deleteDishRequest(producto._id)
          .then((res) => {
            setData(
              data.filter((dishDelete) => dishDelete._id !== producto._id)
            );
            Swal.fire(
              "Eliminado",
              `El plato ${producto.name} ha sido eliminado`,
              "success"
            );
          })
          .catch((err) => {
            alert(err.response);
          });
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <tr className={styles.colProduct}>
        <td>{producto._id}</td>
        <td>{producto.name}</td>
        <td>
          {producto.ingredients.map((ingredient) => ingredient).join(", ")}
        </td>
        <td>{producto.preparation}</td>
        <td>{producto.benefits}</td>
        <td>{producto.category}</td>
        <td>
          {producto.image ? (
            <div className={styles.img_box}>
              <img
                src={producto.image.url}
                className={styles.product__image}
                alt={producto.name}
              />
            </div>
          ) : null}
        </td>
        <td>
          <div className={styles.actionsBtn}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => {
                setPlatoSeleccionado(producto);
                setShow(true);
              }}
            >
              <FaEdit size={18} />
            </button>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => deleteProduct()}
            >
              <FaTrash size={18} />
            </button>
          </div>
        </td>
      </tr>
      <ModalEditarPlato
        show={show}
        setShow={setShow}
        platoSeleccionado={platoSeleccionado}
        data={data}
        setData={setData}
      />
    </>
  );
};
