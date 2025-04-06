import React, { useState } from "react";
import { Link } from "react-router-dom";

import blog1 from '../assets/images/blog/01.jpg'
import blog2 from '../assets/images/blog/02.jpg'
import blog3 from '../assets/images/blog/03.jpg'

export default function AgencyTab(){
    const [ activeIndex, setActiveIndex ] = useState(1)
    return(
        <section className="realtive md:py-24 py-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="font-semibold text-2xl leading-normal mb-4">Crecemos contigo, al ritmo del cambio </h3>

                    <p className="text-slate-400 max-w-xl mx-auto">En PineGrowth creemos que el crecimiento real no es lineal, sino orgánico. Por eso trabajamos con metodologías ágiles que nos permiten iterar, adaptarnos y avanzar contigo, paso a paso, reto a reto.</p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <ul className="flex-column p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-start text-base font-medium rounded-md w-full hover:text-teal-500 duration-500 ${activeIndex === 1 ? 'text-white bg-teal-500 hover:text-white' : ''}`} onClick={() => setActiveIndex(1)}>
                                        <span className="block">Paso 1: Analizamos la necesidad</span>
                                        <span className="text-lg mt-2 block"></span>
                                        <span className="block mt-2">Observamos tu terreno, entendemos tu entorno y detectamos con precisión qué necesita tu empresa para crecer. Escuchamos, analizamos y definimos el problema real antes de actuar.</span>
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-start text-base font-medium rounded-md w-full mt-6 hover:text-teal-500 duration-500 ${activeIndex === 2 ? 'text-white bg-teal-500 hover:text-white' : ''}`} onClick={() => setActiveIndex(2)}>
                                        <span className="block">Paso 2: Propuesta de valor</span>
                                        <span className="text-lg mt-2 block"></span>
                                        <span className="block mt-2">Diseñamos una solución a tu medida. No vendemos paquetes cerrados: sembramos una propuesta única que combina tecnología, innovación y estrategia para resolver tu necesidad concreta.</span>
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-start text-base font-medium rounded-md w-full mt-6 hover:text-teal-500 duration-500 ${activeIndex === 3 ? 'text-white bg-teal-500 hover:text-white' : ''}`} onClick={() => setActiveIndex(3)}>
                                        <span className="block">Paso 3: Ejecución ágil</span>
                                        <span className="text-lg mt-2 block"></span>
                                        <span className="block mt-2">Ponemos manos a la obra. Trabajamos por etapas, con entregas rápidas y constantes, asegurando visibilidad, flexibilidad y mejora continua en cada ciclo.</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8 md:col-span-7">
                        <div id="myTabContent" className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                            <div className={activeIndex === 1 ? '' : 'hidden' }>
                                <img src={blog1} className="shadow dark:shadow-gray-700 rounded-md" alt=""/>

                                <div className="mt-6">
                                    <h5 className="text-lg font-medium">Feedback constante, raíces profundas</h5>
                                    <p className="text-slate-400 mt-4">Escuchamos activamente, aprendemos contigo y ajustamos el rumbo para asegurar que cada entrega se alinee con tu visión.</p>
                                    <div className="mt-4">
                                        <Link to="" className="text-teal-500">Saber más <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={activeIndex === 2 ? '' : 'hidden' }>
                                <img src={blog2} className="shadow dark:shadow-gray-700 rounded-md" alt=""/>

                                <div className="mt-6">
                                    <h5 className="text-lg font-medium">Colaboración como ecosistema</h5>
                                    <p className="text-slate-400 mt-4">Trabajamos codo a codo contigo, no como proveedores, sino como aliados estratégicos que entienden tu entorno y lo hacen crecer.</p>
                                    <div className="mt-4">
                                        <Link to="" className="text-teal-500">Saber más <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={activeIndex === 3 ? '' : 'hidden' }>
                                <img src={blog3} className="shadow dark:shadow-gray-700 rounded-md" alt=""/>

                                <div className="mt-6">
                                    <h5 className="text-lg font-medium">Sprints que siembran valor real</h5>
                                    <p className="text-slate-400 mt-4">Dividimos cada proyecto en ciclos cortos y productivos para entregar resultados tangibles rápidamente.</p>
                                    <div className="mt-4">
                                        <Link to="" className="text-teal-500">Saber más <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
