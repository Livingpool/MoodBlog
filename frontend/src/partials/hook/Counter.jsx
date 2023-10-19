import { Button, Card, Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge((a) => a + 1);
    // Here, a => a + 1 is your updater function. It takes the pending state and calculates the next state from it.

    // React puts your updater functions in a queue. Then, during the next render, it will call them in the same order:

    // a => a + 1 will receive 42 as the pending state and return 43 as the next state.
    // a => a + 1 will receive 43 as the pending state and return 44 as the next state.
    // a => a + 1 will receive 44 as the pending state and return 45 as the next state.
  }

  return (
    <Card className="bg-white inline-block p-10 rounded-lg mb-10">
      <Typography variant="h1" className="text-3xl mb-4">
        useState
      </Typography>
      <Typography variant="h2" className="mb-4 text-xl">
        Your age: {age}
      </Typography>
      <div className="mb-6 flex">
        <Button
          className="mr-4"
          onClick={() => {
            increment();
            increment();
            increment();
          }}
        >
          +3
        </Button>
        <Button
          className="mr-4"
          onClick={() => {
            increment();
          }}
        >
          +1
        </Button>
        <a
          href="https://react.dev/reference/react/useState"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outlined">Doc</Button>
        </a>
      </div>
    </Card>
  );
}
