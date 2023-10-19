import {
  Card as MTCard,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
export default function Card({
  title = 'Title',
  text = 'Text',
  children = undefined,
  className = undefined,
}) {
  return (
    <MTCard className={`m-2 ${className}`}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {text}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {children}
      </CardFooter>
    </MTCard>
  );
}