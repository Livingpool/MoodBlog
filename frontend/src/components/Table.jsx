/* eslint-disable react/no-array-index-key */
import { Card, Typography } from "@material-tailwind/react";
 
export default function Table({
  head = [], // array with objects, format: { title: '', dataIndex: '' }
  rows = [], // array with objects, format: { dataIndex_1: '', dataIndex2: '', ... }
  className = undefined
}) {
  return (
    <Card className={`h-full w-full overflow-hidden ${className}`}>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {head.map(({ title, dataIndex }) => (
              <th key={dataIndex} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {title}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-blue-gray-50/50">
              {Object.values(row).map((value, valueIndex) => (
                <td key={valueIndex} className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {value}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}