import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";

export default function Show({auth, category, postsCount, createdAt}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Categories - <Link
                className='inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                href={route('categories.index')}>List</Link></h2>}
        >
            <Head title="Category"/>
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <div className="flex justify-between items-center">
                        <h1 className="text-white text-lg font-bold">{category.name}</h1>
                        {category.svg_icon ? (
                            <div className="bg-white rounded-md px-3 py-2 w-fit" dangerouslySetInnerHTML={{__html: category.svg_icon}}></div>
                        ) : <p>There is no icon for this category!</p> }
                        </div>
                        <h2 className="text-blue-50">
                            There is/are {postsCount} post(s) with this category
                        </h2>
                        <h3 className="text-blue-50">This category is created at {createdAt}</h3>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
