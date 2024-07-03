import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {useEffect} from "react";
import {toast} from "react-toastify";
import TextInput from "@/Components/TextInput.jsx";
import Swal from "sweetalert2";
import axios from "axios";

export default function Index({auth, categories, queryParams = null}) {
    queryParams = queryParams || {}
    const {props} = usePage()
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
        router.get(route('categories.index'), queryParams)
    }
    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value)
    }
    const deleteCategory = (id) => {
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
                axios.delete(route('categories.destroy', id));
                router.get(route('categories.index'));
            }
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Categories - <Link
                className='inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                href={route('categories.create')}>Create</Link></h2>}
        >
            <Head title="Category"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 upprecase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Posts Count</th>
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
                                               onBlur={e => searchFieldChanged('name', e.target.value)}
                                               onKeyPress={e => onKeyPress('name', e)}
                                               defaultValue={queryParams.name}
                                    />
                                </th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                                <th className="px-3 py-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.data.map((category) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={category.id}>
                                    <th className="px-3 py-2">{category.id}</th>
                                    <td className="px-3 py-2">
                                        <Link href={route('categories.show', category.id)}
                                              className="text-blue-400">{category.name}</Link>
                                    </td>
                                    <td className="px-3 py-3 text-nowrap">{category.posts_count} Post(s)</td>
                                    <td className="px-3 py-3 text-nowrap">{category.created_at}</td>

                                    <td className="px-3 py-3 text-nowrap">{category.updated_at}</td>
                                    <td className="px-3 py-3">
                                        <Link href={route('categories.edit', category.id)}
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                        <span
                                            onClick={() => deleteCategory(category.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1 hover:cursor-pointer">Delete</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination links={categories.meta.links} className="mb-2"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
