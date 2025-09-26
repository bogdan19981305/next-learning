"use client";
import {
  Button,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { useFormikContext } from "formik";
import { CreateIngredient } from "@/types/form-data";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/options";
import { Category, Unit } from "@/generated/prisma";

const IngredientForm = () => {
  const formik = useFormikContext<CreateIngredient>();

  return (
    <Form
      className="w-[1200px] flex-col gap-5 mb-10"
      onSubmit={formik.handleSubmit}
    >
      <div className="grid grid-cols-3 gap-5 w-full">
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
        <Select
          selectionMode="single"
          selectedKeys={[formik.values.category as Category]}
          isClearable
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isRequired
          errorMessage={formik.touched.category && formik.errors.category}
          label="Категория"
          labelPlacement="inside"
          name="category"
          placeholder="Выберите категорию"
          variant="flat"
          size="lg"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select
          selectionMode="single"
          isClearable
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          selectedKeys={[formik.values.unit as Unit]}
          isRequired
          errorMessage={formik.touched.unit && formik.errors.unit}
          label="Единица измерения"
          color="default"
          labelPlacement="inside"
          name="unit"
          placeholder="Выберите единицу измерения"
          variant="flat"
          size="lg"
        >
          {UNIT_OPTIONS.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <NumberInput
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={Number(formik.values.price ?? 0)}
          isRequired
          errorMessage={formik.touched.price && formik.errors.price}
          label="Цена"
          labelPlacement="inside"
          name="price"
          placeholder="Введите цену"
          variant="flat"
          size="lg"
          hideStepper
        />
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={String(formik.values.description ?? "")}
          isRequired
          errorMessage={formik.touched.description && formik.errors.description}
          label="Описание"
          labelPlacement="inside"
          name="description"
          placeholder="Введите описание"
          variant="flat"
          size="lg"
        />
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

export default IngredientForm;
