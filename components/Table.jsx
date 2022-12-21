import React from "react";
import { useContext } from "react";
import { LoginContext } from "./Context";

const Table = () => {
  const { students, loading } = useContext(LoginContext);
  return (
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="border-b bg-black text-white">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Matric
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium px-6 py-4 text-left"
                    >
                      TimeStamp
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    return (
                      <tr class="border-b" key={index}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Matric}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.datetime}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.data.Category}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
