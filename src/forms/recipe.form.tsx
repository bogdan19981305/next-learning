"use client";
import {
  Button,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useFormikContext } from "formik";
import { CreateRecipeDto, IRecipeIngredient } from "@/types/form-data";
import { useIngredientStore } from "@/store/ingredient.store";
const RecipeForm = () => {
  const formik = useFormikContext<CreateRecipeDto>();
  const { ingredients } = useIngredientStore();

  console.log(formik.values);
  return (
    <Form
      className="w-[1200px] gap-5 mb-10 flex flex-col items-center justify-center m-auto"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex gap-5 w-full flex-col items-center justify-center w-full mb-10">
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          isRequired
          errorMessage={formik.touched.name && formik.errors.name}
          label="Название"
          labelPlacement="inside"
          name="name"
          placeholder="Введите название"
          variant="flat"
          size="lg"
        />
        <Textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description ?? ""}
          isRequired
          errorMessage={formik.touched.description && formik.errors.description}
          label="Описание"
          labelPlacement="inside"
          name="description"
          placeholder="Введите описание"
          variant="flat"
          size="lg"
        />
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageUrl ?? ""}
          isRequired
          label="Изображение"
          labelPlacement="inside"
          name="imageUrl"
          placeholder="Введите изображение"
          variant="flat"
          size="lg"
          errorMessage={formik.touched.imageUrl && formik.errors.imageUrl}
        />
        <Select
          selectionMode="multiple"
          selectedKeys={
            new Set(formik.values.ingredients) as unknown as Set<string>
          }
          isClearable
          onSelectionChange={(keys) => {
            console.log(keys);
            const next = Array.from(keys as Set<React.Key>).map(String);
            formik.setFieldValue("ingredients", next);
          }}
          onBlur={formik.handleBlur}
          isRequired
          label="Ингредиенты"
          labelPlacement="inside"
          name="ingredients"
          placeholder="Выберите ингредиенты"
          variant="flat"
          size="lg"
        >
          {ingredients.map((ingredient) => (
            <SelectItem key={ingredient.id}>{ingredient.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-end gap-5 w-full">
        <Button
          color="warning"
          variant="bordered"
          onPress={() => formik.resetForm()}
          size="lg"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          color="success"
          variant="bordered"
          isLoading={formik.isSubmitting}
          onPress={formik.submitForm}
          size="lg"
        >
          Добавить
        </Button>
      </div>
    </Form>
  );
};

export default RecipeForm;
