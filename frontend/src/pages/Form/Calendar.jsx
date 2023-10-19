import { useState } from "react";
import Calendar from "react-calendar";
import Layout from "../../partials/dashboard/Layout";
import "react-calendar/dist/Calendar.css";
import { Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const formatDate = (localDate) => {
    const year = localDate.getFullYear();
    const month = (1 + localDate.getMonth()).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Layout>
      <div className="p-20 flex flex-col justify-center items-center">
        {/* 標題 */}
        <div className='pt-8 pb-4 font-medium text-lg'>選擇日期，回顧以前的日記吧</div>
        <Calendar onChange={setDate} value={date} />
        <div className="flex items-center mt-10">
          <Button
            className="mr-4"
            onClick={() =>
              Swal.fire({
                title: "似乎沒有留下日記呢",
                text: `你選擇的日期為 ${formatDate(date)}`
              })
            }
          >
            查看日記
          </Button>
          {/* <a
            href="https://github.com/wojtekmaj/react-calendar/tree/main/packages/react-calendar"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outlined">Doc</Button>
          </a> */}
        </div>
        {/* <Typography variant="small" className="w-[50%] mt-10">
          Try not to ask ChatGPT about &quot;packages&quot; and try to follow the usage as
          instructed by the official documentation. Of course, aside from the
          package&apos;s own code lines, you can still use ChatGPT to help you
          understand.
        </Typography> */}
      </div>
    </Layout>
  );
}
