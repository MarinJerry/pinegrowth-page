import React, { useState, lazy, Suspense } from "react";

import heroImg from "../assets/images/about2.jpg"

import Navbar from "../components/navbar";
import About from "../components/about";
import Services from "../components/services";
import AgencyTab from "../components/agencyTab";
import Cta from "../components/cta";
import Client from "../components/client";
import Pricing from "../components/pricing";
import GetInTouch from "../components/getInTuoch";
import Footer from "../components/footer";

import { FiMonitor } from '../assets/icons/vander'
import useChatWidget from '../hooks/useChatWidget';

import CountUp from 'react-countup';

import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';

// Lazy load Hero3D to prevent blocking
const Hero3D = lazy(() => import("../components/Hero3D"));

export default function IndexThree() {
    let [isOpen, setOpen] = useState(false);
    const [showHero3D] = useState(true);

    // Configurar el widget de chat de Pine Sales AI
    useChatWidget({
        api: 'https://adela-iys3izl9k-jerry-marins-projects.vercel.app/api/v1/chat/role',
        color: '#14b8a6',
        botName: 'Pine Sales AI',
        welcome: '¡Hola! 👋 Soy tu especialista en soluciones de IA de Pine. ¿En qué área de tu negocio te gustaría automatizar procesos? Te ayudo a encontrar la solución perfecta.'
    });

    return (
        <>
            <Navbar />
            <section className="relative flex items-center md:h-screen py-36 bg-no-repeat bg-center bg-cover" id="home">
                {/* 3D Background */}
                {showHero3D && (
                    <Suspense fallback={
                        <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-teal-50 to-blue-50">
                            <div className="absolute inset-0 opacity-50"></div>
                        </div>
                    }>
                        <Hero3D />
                    </Suspense>
                )}
                {!showHero3D && (
                    <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-teal-50 to-blue-50">
                        <div className="absolute inset-0 opacity-50"></div>
                    </div>
                )}

                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 items-center mt-6 gap-6 relative">
                        <div className="lg:col-span-7 md:me-6">
                            <h4 className="font-semibold text-slate-900 lg:leading-normal leading-normal tracking-wide text-4xl lg:text-5xl mb-5">
                                Haz crecer tu <span className="text-teal-500 font-bold">Negocio</span> con PineGrowth Solutions
                            </h4>
                            <p className="text-slate-600 text-lg max-w-xl">
                                Empoderamos a PYMEs y emprendedores con <span className="text-teal-500">Inteligencia Artificial</span>, tecnología avanzada y consultoría estratégica.
                            </p>

                            <div className="relative mt-6 space-x-1">
                                <button
                                    onClick={() => {
                                        if (window.openPineChat) {
                                            window.openPineChat('Hola, me interesa conocer más sobre sus soluciones de automatización con IA');
                                        } else {
                                            window.scrollTo({
                                                top: document.getElementById('contact')?.offsetTop || 0,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                    className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white hover:bg-teal-600 transition-all hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.5)]"
                                >
                                    <i className="mdi mdi-robot mr-2"></i> Explorar Soluciones IA
                                </button>
                            </div>
                            <ModalVideo
                                channel="youtube"
                                youtube={{ mute: 0, autoplay: 0 }}
                                isOpen={isOpen}
                                videoId="S_CGed6E610"
                                onClose={() => setOpen(false)}
                            />
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative">
                                {/* Improved Image Container with Glassmorphism */}
                                <div className="relative bg-slate-800/50 backdrop-blur-sm p-2 rounded-[150px] rounded-br-2xl border border-slate-700/50">
                                    <img src={heroImg} className="mx-auto rounded-[150px] rounded-br-2xl shadow-lg dark:shadow-gray-700 w-full" alt="PineGrowth Team" />
                                </div>

                                {/* Decorative Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/10 blur-[80px] -z-10 rounded-full"></div>

                                {/* Floating Stats Card 1 */}
                                <div className="absolute flex justify-between items-center bottom-16 md:-start-10 -start-5 p-4 rounded-xl shadow-lg border border-gray-200 bg-white/90 backdrop-blur-md w-60 m-3 animate-[bounce_3s_infinite]">
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center h-[65px] min-w-[65px] bg-teal-500/10 text-teal-500 text-center rounded-full me-3">
                                            <FiMonitor className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-white text-sm">Proyectos IA</span>
                                            <p className="text-xl font-bold"><CountUp className="counter-value" start={0} end={15} />+</p>
                                        </div>
                                    </div>
                                    <span className="text-teal-500"><i className="uil uil-arrow-growth"></i></span>
                                </div>

                                {/* Floating Stats Card 2 */}
                                <div className="absolute top-16 md:-end-10 -end-5 p-4 rounded-xl shadow-lg border border-gray-200 bg-white/90 backdrop-blur-md w-48 m-3">
                                    <h5 className="text-lg font-semibold mb-3">Eficiencia</h5>
                                    <div className="flex justify-between mt-3 mb-2">
                                        <span className="text-slate-400 text-sm">Incremento</span>
                                        <span className="text-teal-500 text-sm">90%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                                        <div className="bg-teal-500 h-[6px] rounded-full" style={{ width: "90%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About />
            <Services />
            <AgencyTab />
            <Client />
            <Cta />
            <Pricing />
            {/* <Blogs/> */}
            <GetInTouch />
            <Footer />
            {/* <Switcher /> */}
        </>
    )
}