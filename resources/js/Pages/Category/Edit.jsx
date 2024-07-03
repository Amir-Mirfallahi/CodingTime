import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Edit({auth, category}) {
    const {data, setData, post, processing, errors} = useForm(
        {
            'name': category.name,
            'svg_icon': category.svg_icon,
            _method: 'PUT'
        },
    )
    const handleCategoryUpdate = (e) => {
        e.preventDefault();
        post(route("categories.update", category.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Categories - <Link
                className='inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                href={route('categories.index')}>List</Link></h2>}
        >
            <Head title="Update Category"/>
            <div className="py-12">
                <div
                    className="max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form className="px-5 pb-4 pt-8" onSubmit={handleCategoryUpdate}>
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight text-center">
                            Update Post
                        </h3>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Name
                                </InputLabel>
                                <TextInput
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2"
                                    value={data.name} onChange={e => setData('name', e.target.value)}
                                    disabled={processing} placeholder="Example: Tech"/>
                                <InputError message={errors.name}/>
                            </div>
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Icon in SVG format
                                </InputLabel>
                                <textarea
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    onChange={e => setData('svg_icon', e.target.value)}
                                    disabled={processing} rows={6}
                                    placeholder="Example: SVG icon for this: </>"
                                    value={data.svg_icon}/>
                                <InputError message={errors.svg_icon}/>
                                {data.svg_icon ? (
                                    <div className="mt-2 bg-white rounded-md px-3 py-2 w-fit" dangerouslySetInnerHTML={{__html: data.svg_icon}}></div>
                                ) : <p className="dark:text-white">There isn't valid icon!</p> }
                            </div>
                            <PrimaryButton className='w-fit'>Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
