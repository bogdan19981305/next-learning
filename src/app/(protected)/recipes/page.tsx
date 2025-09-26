"use client";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const list = [
  {
    title: "Orange",
    img: "https://www.heroui.com/images/fruit-1.jpeg",
    price: "$5.50",
  },
  {
    title: "Tangerine",
    img: "https://www.heroui.com/images/fruit-2.jpeg",
    price: "$3.00",
  },
  {
    title: "Raspberry",
    img: "https://www.heroui.com/images/fruit-3.jpeg",
    price: "$10.00",
  },
  {
    title: "Lemon",
    img: "https://www.heroui.com/images/fruit-4.jpeg",
    price: "$5.30",
  },
  {
    title: "Avocado",
    img: "https://www.heroui.com/images/fruit-5.jpeg",
    price: "$15.70",
  },
  {
    title: "Lemon 2",
    img: "https://www.heroui.com/images/fruit-6.jpeg",
    price: "$8.00",
  },
  {
    title: "Banana",
    img: "https://www.heroui.com/images/fruit-7.jpeg",
    price: "$7.50",
  },
  {
    title: "Watermelon",
    img: "https://www.heroui.com/images/fruit-8.jpeg",
    price: "$12.20",
  },
];

const RecipesPage = () => {
  return (
    <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 w-[1200px] container mx-auto">
      {list.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecipesPage;
