import React, { useState } from "react";
import emailjs from "emailjs-com";
import contact from '../assets/images/contact.svg';

export default function GetInTouch() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        comments: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_lwd0pqm", // Reemplaza con tu Service ID
            "template_8mr39tr", // Reemplaza con tu Template ID
            formData,
            "EGLToteKonOwa-y3z" // Reemplaza con tu User ID
        )
        .then((response) => {
            alert("Correo enviado exitosamente!");
            setFormData({ name: "", email: "", subject: "", comments: "" });
            console.log(formData)
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un error al enviar el correo. Inténtalo nuevamente.");
        });
    };

    return (
        <section className="relative lg:py-24 py-16 bg-slate-50 dark:bg-slate-800" id="contact">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="font-semibold text-2xl leading-normal mb-4">Conectemos y hagamos crecer tu idea </h3>
                    <p className="text-slate-400 max-w-xl mx-auto">Estamos listos para escucharte, acompañarte y sembrar juntos el futuro de tu negocio.</p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
                    <div className="lg:col-span-7 md:col-span-6">
                        <img src={contact} alt="" />
                    </div>

                    <div className="lg:col-span-5 md:col-span-6">
                        <div className="lg:ms-5">
                            <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                                <form onSubmit={handleSubmit}>
                                    <h4 className="font-semibold text-center leading-normal mb-4">“Las grandes ideas comienzan con una conversación.” ¿Agendamos una? </h4>
                                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                                        <div className="lg:col-span-6">
                                            <label htmlFor="name" className="font-semibold">Nombre:</label>
                                            <input
                                                name="name"
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                placeholder=" "
                                            />
                                        </div>

                                        <div className="lg:col-span-6">
                                            <label htmlFor="email" className="font-semibold">Correo:</label>
                                            <input
                                                name="email"
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="lg:col-span-12">
                                            <label htmlFor="subject" className="font-semibold">Solicitud:</label>
                                            <input
                                                name="subject"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="lg:col-span-12">
                                            <label htmlFor="comments" className="font-semibold">Comentarios:</label>
                                            <textarea
                                                name="comments"
                                                id="comments"
                                                value={formData.comments}
                                                onChange={handleChange}
                                                className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                placeholder=""
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        id="submit"
                                        name="send"
                                        className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white mt-2"
                                    >
                                        Enviar Mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}