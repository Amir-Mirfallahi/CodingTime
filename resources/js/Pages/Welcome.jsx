import {Link, Head} from '@inertiajs/react';
import Navbar from "@/Components/Navbar.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({auth, posts}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Coding Time"/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <svg id="background" xmlns="http://www.w3.org/2000/svg" className="absolute -left-20 top-0 max-w-[877px]" viewBox="0 0 877 968">
                    <g clipPath="url(#a)">
                        <circle cx="391" cy="391" r="390.5" className="stroke-blue-300" transform="matrix(-1 0 0 1 416 -56)"/>
                        <circle cx="468" cy="468" r="467.5" className="stroke-blue-300" opacity=".3"
                                transform="matrix(-1 0 0 1 493 -133)"/>
                        <circle cx="558" cy="558" r="557.5" className="stroke-blue-300" opacity=".1"
                                transform="matrix(-1 0 0 1 583 -223)"/>
                        <g filter="url(#b)">
                            <ellipse cx="583" cy="229.5" className="fill-blue-300" rx="583" ry="229.5"
                                     transform="matrix(-1 0 0 1 621 -9)"/>
                        </g>
                        <g filter="url(#c)">
                            <ellipse cx="262" cy="184.5" fill="#fff" rx="262" ry="184.5"
                                     transform="matrix(-1 0 0 1 99 42)"/>
                        </g>
                    </g>
                    <defs>
                        <filter id="b" width="1614" height="907" x="-769" y="-233" colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur result="effect1_foregroundBlur_3089_39042" stdDeviation="112"/>
                        </filter>
                        <filter id="c" width="972" height="817" x="-649" y="-182" colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur result="effect1_foregroundBlur_3089_39042" stdDeviation="112"/>
                        </filter>
                        <clipPath id="a">
                            <path fill="#fff" d="M877 0H0v968h877z"/>
                        </clipPath>
                    </defs>
                </svg>
                <div
                    className="relative min-h-screen flex flex-col items-center justify-center selection:bg-emerald-700 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-start lg:col-start-2">
                                <ApplicationLogo />
                                <h2 className="ml-2 text-center text-cyan-200 mt-5 font-bold">Coding Time</h2>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                <h3 className="text-blue"></h3>
                                <Navbar auth={auth} />
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                {posts.data.map(post => (
                                    <a
                                        key={post.id}
                                        href={route('posts.show', post.id)}
                                        className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                    >
                                        <div
                                            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-300/10 sm:size-16"
                                            dangerouslySetInnerHTML={{__html: post.category.svg_icon}}>
                                        </div>
                                        <div className="pt-3 sm:pt-5">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">{post.title}</h2>

                                            <p className="mt-4 text-sm/relaxed">
                                                {post.content.slice(1, 200)}
                                            </p>
                                        </div>

                                        <svg
                                            className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            All right reserved, Coding Time. 2024 ©️
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
