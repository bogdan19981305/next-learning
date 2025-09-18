export const siteConfig = {
  title: "Tatarian kitchen",
  description:
    "Tatarian kitchen is a collection of recipes from Tatar cuisine.",
  navItems: [
    { label: "Рецепты", href: "/recipes" },
    { label: "Инградиенты", href: "/ingredients" },
    { label: "О нас", href: "/about" },
    { label: "Главная", href: "/" },
  ],
  pageContent: {
    "/": {
      content: "This is content for the home page more content",
    },
    "/recipes": {
      content: "This is content for the recipes page",
    },
    "/ingredients": {
      content: "This is content for the ingredients page",
    },
    "/about": {
      content: "This is content for the about page",
    },
  },
};
