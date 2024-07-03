import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth, categories}) {
    const {data, setData, post, processing, errors} = useForm(
        {
            'title': '',
            'image_path': '',
            'content': '',
            'time_to_read': '',
            'category_id': '',
        },
    )
    const handlePostCreate = (e) => {
        e.preventDefault();
        post(route("posts.index"), {forceFormData: true});
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Posts - <Link
                className='inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                href={route('posts.index')}>List</Link></h2>}
        >
            <Head title="Create Post"/>
            <div className="py-12">
                <div
                    className="max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <form className="px-5 pb-4 pt-8" onSubmit={handlePostCreate}>
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight text-center">
                            Create Post
                        </h3>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Title
                                </InputLabel>
                                <TextInput
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2"
                                    value={data.title} onChange={e => setData('title', e.target.value)}
                                    disabled={processing} placeholder="Example: How to get rich?"/>
                                <InputError message={errors.title} />
                            </div>
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Image Path
                                </InputLabel>
                                <TextInput
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2"
                                    type='file'
                                    onChange={e => setData('image_path', e.target.files[0])}
                                    disabled={processing}/>
                                <InputError message={errors.image_path} />
                            </div>
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Content
                                </InputLabel>
                                <textarea
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    onChange={e => setData('content', e.target.value)}
                                    disabled={processing} rows={6}
                                    placeholder="Example: Practice Makes Perfect"
                                    value={data.content}/>
                                <InputError message={errors.content} />
                            </div>
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Time to Read
                                </InputLabel>
                                <TextInput
                                    className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2"
                                    value={data.time_to_read} onChange={e => setData('time_to_read', e.target.value)}
                                    disabled={processing} placeholder="How much time it will take to read your post?"/>
                                <InputError message={errors.time_to_read} />
                            </div>
                            <div className="col-span-full">
                                <InputLabel className="block font-medium leading-6 text-gray-900">
                                    Category
                                </InputLabel>
                                <SelectInput defaultValue={data.category_id} className='w-full' onChange={e => setData('category_id', e.target.value)}>
                                    <option value=''>Set Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.category_id} />
                            </div>
                            <PrimaryButton className='w-fit'>Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
