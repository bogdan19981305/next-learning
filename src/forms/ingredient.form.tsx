"use client";
import {Button, Form, Input, Select, SelectItem} from "@heroui/react";
import {useFormikContext} from "formik";
import {CreateIngredient} from "@/types/form-data";
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from "@/constants/options";
import {Category, Unit} from "@/generated/prisma";

const IngredientForm = () => {
  const formik = useFormikContext<CreateIngredient>();

  return (
    <Form className="w-[400px] flex-col gap-5" onSubmit={formik.handleSubmit}>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isRequired
            errorMessage={formik.touched.name && formik.errors.name}
            label="Название"
            labelPlacement="outside"
            name="name"
            placeholder="Введите название"
            variant="underlined"
          />
          <Select
            isClearable
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category as Category}
            isRequired
            errorMessage={formik.touched.category && formik.errors.category}
            label="Категория"
            labelPlacement="outside"
            name="category"
            placeholder="Выберите категорию"
            variant="underlined"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
          <Select
            isClearable
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unit as Unit}
            isRequired
            errorMessage={formik.touched.unit && formik.errors.unit}
            label="Единица измерения"
            color="default"
            labelPlacement="outside"
            name="unit"
            placeholder="Выберите единицу измерения"
            variant="underlined"
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={String(formik.values.price ?? "")}
            isRequired
            errorMessage={formik.touched.price && formik.errors.price}
            label="Цена"
            labelPlacement="outside"
            name="price"
            placeholder="Введите цену"
            type="number"
            variant="underlined"
          />
        <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={String(formik.values.description ?? "")}
            isRequired
            errorMessage={formik.touched.description && formik.errors.description}
            label="Описание"
            labelPlacement="outside"
            name="description"
            placeholder="Введите описание"
            variant="underlined"
        />
      <div className="flex justify-center gap-5 w-100">
        <Button color="warning" variant="bordered" onPress={() => formik.resetForm()}>
          Отмена
        </Button>
        <Button
          type="submit"
          color="success"
          variant="bordered"
          isLoading={formik.isSubmitting}
          onPress={formik.submitForm}
        >
          Добавить
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
