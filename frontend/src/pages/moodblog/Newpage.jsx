
export default function MoodBlogComponent() {
    return (
        <main className=" bg-red-400 bg-opacity-50 flex flex-col pr-px">
            <header className="justify-between items-center self-stretch bg-zinc-300 flex flex-col ml-px px-5 py-2 max-md:max-w-full">
                <h1 className="text-black text-left text-3xl w-[1278px] max-w-[1278px] -ml-5 max-md:max-w-full">
                    情緒筆記
                </h1>
            </header>
            <div className="justify-center items-start self-center flex w-[228px] max-w-full gap-5 mt-12 mb-4 px-5">
                <div className="dropdown">
                    <div className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                        選擇日期
                        <div className="dropdown-menu">
                            <input type="date" />
                        </div>
                    </div>
                </div>
            </div>
            <section className="justify-center items-center bg-sky-100 self-center flex w-[812px] max-w-full flex-col mt-12 px-5 py-10 rounded-[40px]">
                <div className="self-center w-[708px] max-w-full my-1.5">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                        <div className="flex flex-col items-stretch w-[4%] max-md:w-full">
                            <div className="items-start flex flex-col my-auto max-md:mt-12">
                                {/* <p>button icon</p> */}

                            </div>
                        </div>
                        <div className="flex flex-col items-stretch w-[80%] ml-5 max-md:w-full">
                            <div className="max-w-[581px] max-md:max-w-full max-md:mt-12">
                                <label htmlFor="moodInput" className="text-black text-3xl">跟我說說，今天過得怎麼樣？</label>
                                <input type="text" id="moodInput" className="p-4 mt-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500" placeholder="請輸入內容" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className="justify-between items-start self-center flex w-[228px] max-w-full gap-5 mt-12 mb-20 px-5">
                <div className="self-stretch flex flex-col w-[89px]">
                    <button className=" rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-500 ">
                        AI聊聊
                    </button>
                </div>
                <div className="self-stretch flex flex-col w-[89px]">
                    <button className=" rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:outline-none focus:ring focus:ring-blue-500 ">
                        儲存
                    </button>
                
                </div>
            </div>
        </main>
    );
}