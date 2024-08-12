'use client';
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import nft from '../../public/warizz.jpg';
import Link from "next/link";
import { Button } from "./ui/button";
import Foot from "@/components/Foot";
import { ModeToggle } from '@/components/toggle'


export default function LandingPage() {
    const [showImage, setShowImage] = useState(true);

    function timer() {
        setTimeout(() => {
            setShowImage(false);
        }, 500)
    }
    useEffect(() => {
        timer();
    }, []);
    return (
        <section className="w-[90%] mx-auto">
            {showImage ? <div className='w-full h-full flex justify-center mt-80'>
                <Image src='/image.svg' alt="Logo" width={400} height={600} className="mb-8 rounded-3xl" priority />                
            </div> : <>
                <section className="md:hidden mt-2">
                    <div className="flex justify-between items-center">
                        <div className=" flex justify-between">
                            <Image src='/image.svg' alt="Logo" width={40} height={30} className=" h-auto" priority />
                        </div>
                        <div> 
                            <Link href='/dashboard' ><Button className="">Dashboard</Button></Link>
                        </div>
                        <div className="">
                            <ModeToggle />

                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="uppercase w-52 mt-4 mb-8 text-2xl text-center">Create and access content all in one place.</h1>
                        <Image src='/image.svg' alt="Logo" width={400} height={600} className="mb-8 rounded-3xl " priority />

                        <Link href='/signup'>
                            <Button className="w-72 bg-[#09233c] p-2 mb-2 rounded-full h-12 text-white text-lg">Create an Account</Button>
                        </Link>
                        <Link href='/login'>
                            <Button className="w-72 bg-[#09233c] mb-2 rounded-full h-10 border border-teal-400 text-white text-lg">Log In</Button>


                        </Link>

                        <p className="w-80 text-sm p-2 mb-10 text-center">By signing up, you are agreeing to our <Link className="text-blue-300" href="">Terms of service</Link> and <Link className="text-blue-300" href="">Public Policy.</Link> </p>
                    </div>
                </section>

                <section className="hidden md:block">
                    <header className="mt-6">
                        <nav className="flex justify-between items-center">
                            <div className="">

                                <Image src='/image.svg' alt="Logo" width={60} height={40} priority className=" h-auto" />
                            </div>
                            <ul className="flex justify-around">
                                <li className="p-2 mr-2"><Link href="">Home</Link></li>
                                <li className="p-2 mr-2"><Link href="">Our Services</Link></li>
                                <li className="p-2"><Link href="">Directory</Link></li>
                            </ul>
                            <div className="">

                                <Link href='/login' ><Button className="mr-8">Log In</Button></Link>
                                <Link href='/signup'><Button className="mr-8 bg-[#09233c] p-2 rounded-md text-white">Sign Up</Button></Link>
                                <Link href='/dashboard'><Button className="mr-2 bg-[#09233c] p-2 rounded-md text-white">Dashboard</Button></Link>
                            </div>
                            <div>
                                <ModeToggle />
                            </div>
                        </nav>
                    </header>
                    <main>
                        <section className="flex justify-between items-center mt-16">
                            <div className="w-72 ml-2">
                                <p className="text-4xl font-bold">Over <span className="text-blue-400">10,000</span>  Articles Written</p>
                                <span className="mt-2 text-gray-500 block text-base">By peer-reviewing every article posted on waveSort, you are sure of every post.</span>
                            </div>
                            <div className="w-64 h-80 bg-[#09233c] rounded-xl mr-2"></div>
                        </section>
                        {/* <section className="bg-[#09233c] mt-24 flex justify-around items-center">
                            <div>
                                <Image src='/next.svg' alt="Logo" width={40} height={40} />
                            </div>
                            <div className="w-80 mr-4">
                                <p className="text-3xl font-bold">Join waveSort Today</p>
                                <span className="text-gray-500 block text-sm text-center mt-2 mb-4">By peer-reviewing every article posted on waveSort, you are sure of every post.</span>
                                <div className="flex justify-between items-center">
                                    <Image src='/next.svg' alt="Logo" width={40} height={40} />
                                    <div className="flex flex-col">
                                        <div className="bg-teal-300 w-56 h-10 text-white rounded-md text-center flex justify-evenly items-center">
                                            <div>
                                                <Image src='/next.svg' alt="Logo" width={40} height={40} />
                                            </div>
                                            <a href=""> Download on Play Store</a>
                                        </div>
                                        <div className="bg-teal-300 w-56 h-10 text-white rounded-md text-center mt-2 flex justify-evenly items-center">
                                            <div>
                                                <Image src='/next.svg' alt="Logo" width={40} height={40} />
                                            </div>
                                            <a href="">Download on App Store</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section> */}
                        <section className="my-10 text-center">
                            <h3 className="text-2xl">What Do Our Users say About Us?</h3>
                            <p>Our 20,000+ customers have only positive things to say about us!
                                Take a look.</p>
                        </section>
                    </main>
                    <Foot />
                </section>
            </>}
        </section>
    )
}