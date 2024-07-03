import {Link, Head, useForm, router} from '@inertiajs/react';
import Navbar from "@/Components/Navbar.jsx";
import {FaCalendar, FaClock, FaPen, FaTrash} from 'react-icons/fa6'
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

export default function Show({auth, post: postData, createdAt, author}) {
    const currentPost = postData.data;
    const {data, setData, processing, post, errors} = useForm({
        'comment': '',
        'post_id': currentPost.id,
    })

    const handleCommentCreate = (e) => {
        e.preventDefault();
        post(route('comments.index'));
    }
    const deleteComment = commentId => {
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
                axios.delete(route('comments.destroy', commentId))
                    .then(() => toast.success('Your comment is successfully deleted!'))
                    .catch(() => toast.error('Something went wrong while deleting your comment...'));
                // router.get(route('posts.show', currentPost.id))
                router.reload("preserveScroll");
            }
        });
    }
    return (
        <>
            <Head title={currentPost.title}/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div
                    className="relative min-h-screen flex flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full px-10">
                        <header className="grid grid-cols-2 items-center gap-2 py-10">
                            <h2 className=" font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                {currentPost.title}
                            </h2>
                            <Navbar auth={auth}/>
                        </header>

                        <main className="mt-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded ring-2 ring-amber-600 w-fit px-4 py-3 bg-gray-900 mb-2">
                                    <FaClock className="inline mr-2 text-red-600"/>Time to
                                    read: {currentPost.time_to_read}<br/>
                                    <FaPen className="inline mr-2 text-blue-500"/>Author: {author.name}<br/>
                                    <FaCalendar className="inline mr-2 text-emerald-500"/>Created at: {createdAt}
                                </div>
                                <div
                                    className="rounded ring-2 ring-amber-600 w-fit px-4 py-3 bg-gray-900 mb-2 flex gap-3">
                                    {author.id === auth.user.id &&
                                        <Link
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                            href={route('posts.edit', currentPost.id)}>Edit</Link>
                                    }
                                    {auth.user.id === author.id ? <Link
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        href={route('posts.index')}>View Posts</Link> : <Link
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        href={route('home')}>View Posts</Link>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <img src={currentPost.image_path} alt={currentPost.title} className="rounded-lg"/>
                                <p className="text-gray-300" dangerouslySetInnerHTML={{__html: currentPost.content}}/>
                            </div>
                            <div>
                                {auth.user ? (
                                    <form onSubmit={handleCommentCreate}>
                                        <div className="my-3">
                                            <InputLabel
                                                className="block font-medium leading- 6text-gray-900 dark:text-gray-50">
                                                Comment
                                            </InputLabel>
                                            <textarea
                                                className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full pl-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm md:max-w-96 ml-3"
                                                onChange={e => setData('comment', e.target.value)}
                                                disabled={processing} rows={6}
                                                placeholder="Example: It was great"
                                                value={data.comment}/>
                                            <InputError message={errors.comment}/>
                                        </div>
                                        <PrimaryButton>
                                            Submit
                                        </PrimaryButton>
                                    </form>
                                ) : (
                                    <>
                                        <p className="text-gray-900 dark:text-gray-50">You have to login if you want to
                                            leave a comment!</p>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                                <div className='grid gap-4 md:max-w-96 my-4'>
                                    {currentPost.comments.map(comment => (
                                        <div
                                            className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                            key={comment.id}>
                                            <span
                                                className="text-lg font-bold">{comment.user.name}:</span>{comment.comment}
                                            {auth.user.id === comment.user.id &&
                                                <FaTrash className="text-red-500 ml-auto self-center cursor-pointer"
                                                         onClick={() => deleteComment(comment.id)}/>}
                                        </div>
                                    ))}
                                </div>
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
