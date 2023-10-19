export default function MoodBlogComponent() {
    return (
        <main className="items-center bg-neutral-400 bg-opacity-50 flex flex-col pr-px">
            <header className="justify-between items-center self-stretch bg-zinc-300 flex flex-col ml-px px-5 py-9 max-md:max-w-full">
                <h1 className="text-black text-center text-4xl self-center w-[1278px] max-w-[1278px] -ml-5 max-md:max-w-full">MoodBlog</h1>
            </header>
            <section className="text-black text-4xl self-center w-[119px] max-w-full mt-12">Mood</section>
            <div className="justify-center items-center border self-center flex w-[666px] h-[92px] flex-col mt-12 rounded-xl border-solid border-zinc-800 max-md:max-w-full" />
            <section className="text-black text-4xl self-center mt-12">Feedback</section>
            <div className="text-zinc-600 text-4xl self-center max-w-full justify-between items-center content-center gap-y-2.5 flex-wrap border w-[666px] mt-12 pl-1.5 pr-5 pt-6 pb-6 rounded-xl border-solid border-zinc-800 max-md:max-w-full">Feedback</div>
            <div className="self-center flex w-[89px] max-w-full flex-col mt-12 mb-28">
                <button className="text-black text-lg self-stretch border bg-zinc-300 w-full grow pt-3 pb-3.5 px-5 rounded-xl border-solid border-zinc-400">Save</button>
            </div>
        </main>
    );
}