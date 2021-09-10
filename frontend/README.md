# Micro frontend

This is primarily being developed by [Edaz](https://github.com/edazpotato).

You can view the designs for the frontend [on Figma](https://www.figma.com/file/JElZBj1O6KFYTBAfu4zx75/Micro?node-id=0%3A1).

Made using:

-   [Typescript](https://github.com/microsoft/typescript)
-   [Next.JS](https://github.com/vercel/next.js)
-   [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
-   [Storybook](https://github.com/storybookjs/storybook/)
-   [React-Aria](https://react-spectrum.adobe.com/react-aria)

### Developing

Use React-Aria when possible for components because A: it makes handling component state easy, and B: it handles accessibility for us (mostly - you still need to add `aria-whatever` attributes on occasion).

Dependencies are managed with [`pnpm`](https://pnpm.io/), which is just normal `npm` but with a `p` at the start of every command. Install it with `npm i -g pnpm` and then just use `pnpm` instead whenever you would use `npm` for a command.

```bash
git clone https://github.com/edazpotato/Micro.git
cd Micro/frontend
pnpm i              # Install dependencies with pnpm
pnpm run storybook  # Start Storybook dev server (for developing components)
pnpm run dev        # Start Next.JS dev server (for developing the main app)
```

Make sure to write stories for new components, or breaking changes to/new variants of existing components.
