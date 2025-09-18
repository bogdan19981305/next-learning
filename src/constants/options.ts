import {Category, Unit} from "@/generated/prisma";

export const CATEGORY_OPTIONS = [
  {
    value: Category.VEGETABLE,
    label: "Овощи",
  },
  {
    value: Category.FRUIT,
    label: "Фрукты",
  },
  {
    value: Category.OTHER,
    label: "Другое",
  },
  {
    value: Category.DAIRY,
    label: "Молочные продукты",
  },
  {
    value: Category.GRAIN,
    label: "Зерновые",
  },
  {
    value: Category.PROTEIN,
    label: "Белковые продукты",
  },
  {
    value: Category.SPICE,
    label: "Специи",
  }
] as const;

export const UNIT_OPTIONS = [
  {
    value: Unit.G,
    label: "Грамм",
  },
  {
    value: Unit.KG,
    label: "Килограмм",
  },
  {
    value: Unit.L,
    label: "Литр",
  },
  {
    value: Unit.ML,
    label: "Миллилитр",
  },
  {
    value: Unit.PCS,
    label: "Штука",
  }
] as const;
