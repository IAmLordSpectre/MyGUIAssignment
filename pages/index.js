import React from "react";
import Table from "../components/Table";
import { LoginContext, ThankContext } from "../components/Context";
import Deadline from "../components/Deadline";
import exportFromJSON from "export-from-json";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter, Router } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [submit, setsubmit] = useState(true);
  const [download, setdownload] = useState([]);
  const [remark, setRemark] = useState("");
  const [removeTimer, setRemoveTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datetime, setDatetime] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadlineDisplay, setdeadlineDisplay] = useState("");

  const deadline = new Date("12/23/2022 12:00");

  //Conversions
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const getTime = () => {
    const time = deadline - new Date();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (minutes > 0) {
      setRemoveTimer(false);
      setRemark("Full");
      setsubmit(true);
    } else if (
      minutes < 0 &&
      minutes > -15 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 5 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-5");
      setsubmit(true);
    } else if (
      minutes <= -15 &&
      minutes > -30 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Last Submission 10 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-10");
      setsubmit(true);
    }
    if (
      minutes <= -30 &&
      minutes > -45 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 15 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-15");
      setsubmit(true);
    } else if (
      minutes <= -45 &&
      minutes > -60 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 20 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-20");
      setsubmit(true);
    } else if (hours <= -2) {
      setdeadlineDisplay("Deadline has been exceeded! ");
      setRemoveTimer(true);
      setsubmit(false);
    } else if (days < -1) {
      setdeadlineDisplay("Deadline has been exceeded!");
      setsubmit(false);
      setRemoveTimer(true);
    }

    console.log(days);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  //Get Current Date and Time

  const getDateTime = () => {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    return setDatetime(date);
  };
  //Session
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    getDateTime();

    //Fetch Submission Data from the API
    const fetchData = async () => {
      setLoading(true);

      const res = await axios.get(
        "https://api.netlify.com/api/v1/sites/b5c57396-6b17-4c15-882c-18c89ce8a5b3/submissions",
        {
          headers: {
            Authorization: "bearer IkTYCDR_LxGCeiP8VYas5T0Vv7jn73V29jQtbx20MdQ",
          },
        }
      );
      setStudents(res.data);
      let downloads = res.data;
      let downloadData = downloads.map((download) => {
        let down = download.data;
        const { FullName, MatricNumber, Section, datetime, remark, Report } =
          down;

        return {
          Name: FullName,
          Matric: MatricNumber,
          Section: Section,
          DateTime: datetime,
          Remark: remark,
          Report: Report.url,
        };
      });
      setdownload(downloadData);
      console.log(download);
    };

    fetchData();
  }, []);

  const data = download;

  const ExporttoXLS = () => {
    const fileName = "reportsubmissions";
    const exportType = "xls";

    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <>
      <div className="md:flex md:items-center md:justify-center w-full p-8 sm:rounded-lg md:rounded-none">
        <div className="max-w-xl w-full space-y-12">
          <div className="w-full lg:text-left text-center">
            <div className="w-full flex items-center flex-col justify-center">
              {session ? (
                <button
                  onClick={() => router.push("api/auth/signout")}
                  class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  data-rounded="rounded-md"
                  data-primary="blue-600"
                  data-primary-reset="{}"
                >
                  Admin Logout
                </button>
              ) : (
                <button
                  onClick={() => router.push("api/auth/signin")}
                  class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-black border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  data-rounded="rounded-md"
                  data-primary="blue-600"
                  data-primary-reset="{}"
                >
                  Admin Login
                </button>
              )}
              <ThankContext.Provider value={{ deadlineDisplay }}>
                <Deadline />
              </ThankContext.Provider>
              <div className="bg-blue-500 flex flex-col w-full border border-gray-900 rounded-lg px-8 py-8">
                <form
                  method="POST"
                  name="report"
                  enctype="multipart/form-data"
                  className="flex flex-col space-y-4 mt-2"
                  data-netlify="true"
                >
                  <input type="hidden" name="datetime" value={datetime} />
                  <input type="hidden" name="remark" value={remark} />
                  <input type="hidden" name="form-name" value="report" />
                  <label
                    className=" flex font-bold text-lg text-white items-start"
                    for="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="MatricNo"
                    placeholder=""
                    className="border rounded-lg py-3 px-3 mt-4 bg-white border-indigo-600 placeholder-white-500 text-black"
                    required
                  />
                  <label
                    className="flex font-bold text-lg text-white"
                    form="MatricNumber"
                  >
                    Matric Number
                  </label>
                  <input
                    type="text"
                    name="Matric"
                    placeholder=""
                    id="MatricNumber"
                    className="border rounded-lg py-3 px-3 bg-white border-indigo-600 placeholder-white-500 text-black"
                    required
                  />
                  <label
                    className="flex font-bold text-lg text-white"
                    form="Category"
                  >
                    Category
                  </label>
                  <select
                    type="text"
                    name="Category"
                    placeholder=""
                    id="Category"
                    className="border rounded-lg py-3 px-3 bg-white border-indigo-600 placeholder-white-500 text-black"
                    required
                  >
                    <option value="Regular">Regular</option>
                    <option value="DirectEntry">Direct Entry</option>
                  </select>
                  <label className="flex font-bold text-lg text-white ">
                    Report Upload
                  </label>
                  <input
                    type="file"
                    formControlName="amount"
                    placeholder="Amount in INR"
                    className="border rounded-lg py-3 px-3 mt-4 bg-white border-indigo-600 placeholder-white-500 text-black file:rounded-md file:bg-blue-600 file:text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {session ? (
        <div className="flex  justify-center">
          <button
            class="mb-5 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            data-rounded="rounded-md"
            data-primary="blue-600"
            data-primary-reset="{}"
            onClick={ExporttoXLS}
          >
            Download Submissions
          </button>
        </div>
      ) : null}
      <LoginContext.Provider value={{ students, loading }}>
        <Table />
      </LoginContext.Provider>
    </>
  );
}
