import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllProducts, deleteProduct, createProduct } from '../../services/productService'; // Asegúrate de actualizar la ruta de importación

export default function ProductsTable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar el producto.',
                    'error'
                );
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Producto',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Descripción">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Precio" type="number">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Categoría">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Stock" type="number">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            confirmButtonColor: 'green',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const description = document.getElementById('swal-input2').value;
                const price = parseFloat(document.getElementById('swal-input3').value);
                const category = document.getElementById('swal-input4').value;
                const stock = parseInt(document.getElementById('swal-input5').value);

                if (!name || !description || isNaN(price) || !category || isNaN(stock)) {
                    Swal.showValidationMessage('All fields are required and price/stock must be valid numbers');
                    return false;
                }

                return { name, description, price, category, stock };
            }
        });

        if (formValues) {
            try {
                const newProduct = await createProduct(formValues.name, formValues.description, formValues.price, formValues.category, formValues.stock);
                setProducts([...products, newProduct]);
                Swal.fire('Success', 'Product added successfully', 'success');
            } catch (error) {
                Swal.fire('Error', 'There was an error adding the product', 'error');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 mt-10">
            <h1 className="text-2xl font-bold mb-10">Productos</h1>
            <div className="relative w-full max-w-4xl">
                <button 
                    type="button" 
                    onClick={handleAdd}
                    className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                    Agregar
                </button>
                <div className="pt-20 overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr className="bg-blue-gray-100 text-gray-700">
                                <th className="py-3 px-4 text-center">Id</th>
                                <th className="py-3 px-4 text-center">Nombre</th>
                                <th className="py-3 px-4 text-center">Descripción</th>
                                <th className="py-3 px-4 text-center">Precio</th>
                                <th className="py-3 px-4 text-center">Categoría</th>
                                <th className="py-3 px-4 text-center">Stock</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-blue-gray-200">
                                    <td className="py-3 px-4 text-center">{product.id}</td>
                                    <td className="py-3 px-4 text-center">{product.name}</td>
                                    <td className="py-3 px-4 text-center">{product.description}</td>
                                    <td className="py-3 px-4 text-center">{product.price.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-center">{product.category}</td>
                                    <td className="py-3 px-4 text-center">{product.stock}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="font-medium text-red-600 hover:text-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
