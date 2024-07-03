import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {useEffect} from "react";
import {toast} from "react-toastify";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import Swal from "sweetalert2";
import axios from "axios";

export default function Index({auth, posts, categories, queryParams = null}) {
    queryParams = queryParams || {}
    const {props} = usePage()
    console.log(props.flash);
    // Show a toast notification when the component mounts
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
    }, [props.flash]);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('posts.index'), queryParams)
    }
    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value)
    }
    const deletePost = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(route('posts.destroy', id));
                router.get(route('posts.index'));
            }
        });

    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Posts - <Link
                className='inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                href={route('posts.create')}>Create</Link></h2>}
        >
            <Head title="Post"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 upprecase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Title</th>
                                <th className="px-3 py-2">Author</th>
                                <th className="px-3 py-2">Category</th>
                                <th className="px-3 py-2">Time to Read</th>
                                <th className="px-3 py-2">Created Date</th>
                                <th className="px-3 py-2">Updated Date</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                            </thead>
                            <thead
                                className="text-xs text-gray-700 upprecase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <TextInput className="lg:w-72 sm:w-full"
                                               onBlur={e => searchFieldChanged('title', e.target.value)}
                                               onKeyPress={e => onKeyPress('title', e)}
                                               defaultValue={queryParams.name}
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2">
                                    <SelectInput
                                        className="w-full"
                                        defaultValue={queryParams.category_id}
                                        onChange={e => searchFieldChanged('category_id', e.target.value)}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </SelectInput>
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2 text-right"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.data.map((post) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={post.id}>
                                    <th className="px-3 py-2">{post.id}</th>
                                    <td className="px-3 py-2">
                                        <Link href={route('posts.show', post.id)}
                                              className="text-blue-400">{post.title}</Link>
                                    </td>
                                    <td className="px-3 py-3">{post.author.name}</td>
                                    <td className="px-3 py-3">{post.category.name}</td>
                                    <td className="px-3 py-3">{post.time_to_read}</td>
                                    <td className="px-3 py-3 text-nowrap">{post.created_at}</td>
                                    <td className="px-3 py-3 text-nowrap">{post.updated_at}</td>
                                    <td className="px-3 py-3">
                                        <Link href={route('posts.edit', post.id)}
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                        <span
                                            onClick={() => deletePost(post.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1 hover:cursor-pointer">Delete</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination links={posts.meta.links} className="mb-2"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
