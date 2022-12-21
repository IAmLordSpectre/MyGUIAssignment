import React from "react";
import { useContext } from "react";
import { LoginContext } from "./Context";

const Table = () => {
  const { students, loading } = useContext(LoginContext);
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b bg-black text-white">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Matric
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      TimeStamp
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Matric}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.datetime}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Category}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.remark}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Table;
