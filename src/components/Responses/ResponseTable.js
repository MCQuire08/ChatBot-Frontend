import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllResponses, deleteResponse, createResponse } from '../../services/responseService';

export default function ResponseTable() {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        async function fetchResponses() {
            try {
                const data = await getAllResponses();
                setResponses(data);
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        }

        fetchResponses();
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
                await deleteResponse(id);
                setResponses(responses.filter(response => response.id !== id));
                Swal.fire(
                    'Eliminado!',
                    'La respuesta ha sido eliminada.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar la respuesta.',
                    'error'
                );
                console.error('Error deleting response:', error);
            }
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Respuesta',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Disparador">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Respuesta">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            confirmButtonColor:'green',
            cancelButtonText:'Cancelar',
            cancelButtonColor:'red',
            preConfirm: () => {
                const trigger = document.getElementById('swal-input1').value;
                const reply = document.getElementById('swal-input2').value;

                if (!trigger || !reply) {
                    Swal.showValidationMessage('Both fields are required');
                    return false;
                }

                return { trigger, reply };
            }
        });

        if (formValues) {
            try {
                const newResponse = await createResponse(formValues.trigger, formValues.reply);
                setResponses([...responses, newResponse]);
                Swal.fire('Success', 'Response added successfully', 'success');
            } catch (error) {
                Swal.fire('Error', 'There was an error adding the response', 'error');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 mt-10">
            <h1 className="text-2xl font-bold mb-10">Respuestas</h1>
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
                                <th className="py-3 px-4 text-center">Disparador</th>
                                <th className="py-3 px-4 text-center">Respuesta</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {responses.map((response) => (
                                <tr key={response.id} className="border-b border-blue-gray-200">
                                    <td className="py-3 px-4 text-center">{response.id}</td>
                                    <td className="py-3 px-4 text-center">{response.trigger}</td>
                                    <td className="py-3 px-4 text-center">{response.reply}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(response.id)}
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
