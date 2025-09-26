import { useIngredientStore } from "@/store/ingredient.store";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/options";

const IngredientTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();

  return (
    <div className="w-[1200px]">
      <Table>
        <TableHeader>
          <TableColumn>Название</TableColumn>
          <TableColumn>Категория</TableColumn>
          <TableColumn>Единица измерения</TableColumn>
          <TableColumn>Цена</TableColumn>
          <TableColumn>Описание</TableColumn>
          <TableColumn>Действия</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={
            <div className="w-full flex justify-center items-center bg-gray-900 h-full w-full z-10 opacity-90">
              <Spinner size="lg" />
            </div>
          }
          emptyContent={
            <div className="w-full flex justify-center items-center bg-gray-900 h-full w-full z-10 opacity-90">
              <p className="text-white">Нет данных</p>
            </div>
          }
        >
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell>
                {
                  CATEGORY_OPTIONS.find(
                    (category) => category.value === ingredient.category
                  )?.label
                }
              </TableCell>
              <TableCell>
                {
                  UNIT_OPTIONS.find((unit) => unit.value === ingredient.unit)
                    ?.label
                }
              </TableCell>
              <TableCell>{ingredient.price}</TableCell>
              <TableCell>{ingredient.description}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={() => removeIngredient(ingredient.id)}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IngredientTable;
