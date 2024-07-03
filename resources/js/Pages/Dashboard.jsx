import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {FaArrowRight} from "react-icons/fa6";

export default function Dashboard({auth, categories, latestPosts}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="max-w-fit sm:px-6 lg:px-8 inline-block">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Latest Categories:</h2>
                        <ul className="text-gray-900 dark:text-gray-100 pl-3">
                            {categories.data.map(category => (
                                <li key={category.id}>
                                    <FaArrowRight className="inline mr-2"/>
                                    <Link href={route('categories.show', category.id)}
                                          className="text-cyan-500">{category.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="max-w-fit sm:px-6 lg:px-8 inline-block">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Latest Posts:</h2>
                        <ul className="text-gray-900 dark:text-gray-100 pl-3">
                            {latestPosts.data.map(post => (
                                <li key={post.id}>
                                    <FaArrowRight className="inline mr-2"/>
                                    <Link href={route('posts.show', post.id)}
                                          className="text-cyan-500">{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
