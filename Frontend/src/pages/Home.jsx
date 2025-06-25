import { Link } from 'react-router-dom';
import GenimedsHeader from '../components/GenimedsHeader';
import Trust from '../components/Trust';
import { BackgroundLines } from "../components/BackgroundLines";

const Home = () => {
    return (
        <>
            <BackgroundLines className="bg-gray-50 ">
                <div className="relative py-12 sm:py-16 lg:pt-20 pb-32">
                    <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">Made by Developers, for Healthcare</p>
                            <GenimedsHeader />
                            <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">Empowering users with affordable healthcare through AI-driven prescription analysis, medicine insights, and proactive wellness support..</p>

                            <div className="relative inline-flex mt-10 group">
                                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                                <Link
                                    to="/chat"
                                    className="z-50 relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    role="button"
                                >
                                    Let's Chat with Our AI Assistant
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 md:mt-20">
                        <img className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100" src="https://d33wubrfki0l68.cloudfront.net/54780decfb9574945bc873b582cdc6156144a2ba/d9fa1/images/hero/4/illustration.png" alt="" />
                    </div>

                </div>
            </BackgroundLines >
            <Trust />
        </>
    )
}

export default Home
