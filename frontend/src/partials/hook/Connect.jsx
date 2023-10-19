import { Card, Option, Select, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Connect() {
  const [engine, setEngine] = useState('GPT 3.5');
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoading) {
      setIsFirstLoading(false);
      return;
    }
    Swal.fire({
      title: '引擎變更！',
      text: `變為${engine}`
    })
    // Execute the code inside here whenever the engine changes.
  }, [engine])

  return (
    <Card className="bg-white inline-block p-10 rounded-lg">
      <Typography variant="h1" className="text-3xl mb-8">
        useEffect
      </Typography>
      <Select variant="static" label="Select Version" value={engine} onChange={(value) => setEngine(value)}>
        <Option value="GPT 3.5">GPT 3.5</Option>
        <Option value="GPT 4">GPT 4</Option>
        <Option value="GPT Transformer">GPT Transformer</Option>
        <Option value="GPT Doctor Strange">GPT Doctor Strange</Option>
        <Option value="GPT Tudi Gong">GPT Tudi Gong</Option>
      </Select>
      <Typography variant="p" className="mt-6">
        連線狀態<br />
        <b>{engine}</b>
      </Typography>
    </Card>
  );
}
