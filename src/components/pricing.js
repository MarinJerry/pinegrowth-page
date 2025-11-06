import React from "react";
import { Link } from "react-router-dom";

export default function Pricing(){
    return(
        <section className="relative md:py-24 py-16 bg-slate-50 dark:bg-slate-800" id="pricing">
        <div className="container relative">
            <div className="grid grid-cols-1 pb-6 text-center">
                <h3 className="font-semibold text-2xl leading-normal mb-4">Planes Pine AI</h3>
                <p className="text-slate-400 max-w-xl mx-auto">Pine AI es mucho más que una plataforma:
                es una asistente digital potenciada por IA que te ayuda a organizar, gestionar y hacer crecer tu negocio de forma simple, eficiente y sin complicaciones.</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                <div className="group p-6 relative overflow-hidden shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 rounded-md h-fit">
                    <h6 className="font-semibold mb-5 text-xl">Plan semilla</h6>

                    <div className="flex mb-5">
                        <span className="text-lg font-medium">L.</span>
                        <span className="price text-5xl h6 font-semibold mb-0">499</span>
                        <span className="text-lg font-medium self-end mb-1">/mes</span>
                    </div>

                    <ul className="list-none text-slate-400">
                        <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Ideal para profesionales independientes o negocios en etapa temprana.</span></li>
                    </ul>
                    <button 
                        onClick={() => window.openPineChat && window.openPineChat('Me interesa el Plan Semilla de L.499/mes. ¿Pueden darme más información?')} 
                        className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500/5 hover:bg-teal-500 text-teal-500 hover:text-white w-full mt-5 transition-colors"
                    >
                        Solicitar Demo
                    </button>
                </div>

                <div className="group p-6 relative overflow-hidden shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 rounded-md h-fit">
                    <h6 className="font-semibold mb-5 text-xl">Plan Raíz</h6>

                    <div className="flex mb-5">
                        <span className="text-lg font-medium">L.</span>
                        <span className="price text-5xl h6 font-semibold mb-0">999</span>
                        <span className="text-lg font-medium self-end mb-1">/mes</span>
                    </div>

                    <ul className="list-none text-slate-400">
                        <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Para negocios que comienzan a crecer y necesitan más control.</span></li>
                        <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Todo lo del Plan Semilla, más: IA predictiva para gestión de citas y seguimiento</span></li>
                    </ul>
                    <button 
                        onClick={() => window.openPineChat && window.openPineChat('Me interesa el Plan Raíz de L.999/mes. ¿Pueden contactar a un agente conmigo?')} 
                        className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500/5 hover:bg-teal-500 text-teal-500 hover:text-white w-full mt-5 transition-colors"
                    >
                        Contactar Agente
                    </button>
                </div>

                <div className="group relative overflow-hidden shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 rounded-md h-fit">
                    <div className="bg-gradient-to-tr from-teal-500 to-teal-700 text-white py-2 px-6 h6 text-lg font-medium">Popular</div>
                    <div className="p-6">
                        <h6 className="font-semibold mb-5 text-xl">Plan Bosque</h6>

                        <div className="flex mb-5">
                            <span className="text-lg font-medium">L.</span>
                            <span className="price text-5xl h6 font-semibold mb-0">1,799</span>
                            <span className="text-lg font-medium self-end mb-1">/mes</span>
                        </div>

                        <ul className="list-none text-slate-400">
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Empresas en expansión que necesitan un verdadero asistente estratégico.</span></li>
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Todo lo del Plan Raíz, más: IA avanzada para análisis de comportamiento de clientes</span></li>
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Integración con redes sociales y correo electrónico</span></li>
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Personalización de marca</span></li>
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Asesoría mensual 1:1 con un experto</span></li>
                            <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Hasta 10 usuarios</span></li>
                        </ul>
                        <button 
                            onClick={() => window.openPineChat && window.openPineChat('Quiero contratar el Plan Bosque de L.1,799/mes. Es perfecto para mi empresa en expansión.')} 
                            className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white w-full mt-5 hover:bg-teal-600 transition-colors"
                        >
                            Contratar ahora
                        </button>

                        <p className="text-sm text-slate-400 mt-1.5"><span className="text-red-600">*</span></p>
                    </div>
                </div>

                <div className="group p-[1px] relative overflow-hidden shadow dark:shadow-gray-700 rounded-md bg-gradient-to-tr from-teal-500 to-teal-700 h-fit">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-md">
                        <h6 className="font-semibold mb-5 text-xl">¿Necesitas algo a medida?</h6>

                        <p className="text-slate-400 mb-5">Ofrecemos planes personalizados para equipos grandes o integraciones avanzadas.</p>

                        <ul className="list-none">
                            <li className="mb-1 font-medium flex"><i className="mdi mdi-check-circle-outline text-teal-500 text-[20px] align-middle me-2"></i> <span>Precio personalizado</span></li>
                        </ul>
                        <button 
                            onClick={() => window.openPineChat && window.openPineChat('Necesito una solución personalizada para mi empresa. ¿Pueden ayudarme con una cotización a medida?')} 
                            className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500/5 hover:bg-teal-500 text-teal-500 hover:text-white w-full mt-5 transition-colors"
                        >
                            Cotizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}