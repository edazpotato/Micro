# Micro frontend

This is primarily being developed by [Edaz](https://github.com/edazpotato).

You can view the designs for the frontend [on Figma](https://www.figma.com/file/JElZBj1O6KFYTBAfu4zx75/Micro?node-id=0%3A1).

Made using:

-   [Typescript](https://github.com/microsoft/typescript)
-   [Next.JS](https://github.com/vercel/next.js)
-   [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
-   [Storybook](https://github.com/storybookjs/storybook/)

### Developing

Dependencies are managed with [`pnpm`](https://pnpm.io/), which is just normal `npm` but with a `p` at the start of every command. Install it with `npm i -g pnpm` and then just use `pnpm` instead whenever you would use `npm` for a command.

```bash
git clone https://github.com/edazpotato/Micro.git
cd Micro
pnpm i        # Install dependencies with pnpm
pnpm run dev  # Start Next.JS dev server
```

When working on components, use `pnpm run storybook` to easily preview them. Also make sure to write stories for new components, or breaking changes to/new variants of existing components.
