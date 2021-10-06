import express from 'express'

interface IServerArgs {
  command: string
  file: string
  env: Array<string>
  args: Array<IServerArgument>
}

interface IServerArgument {
  arg: string
  data: Array<string>
}

interface IRouterOptions {
  /**
    * Enable case sensitivity.
    */
  caseSensitive?: boolean

  /**
    * Preserve the req.params values from the parent router.
    * If the parent and the child have conflicting param names, the child’s value take precedence.
    *
    * @default false
    * @since 4.5.0
    */
  mergeParams?: boolean

  /**
    * Enable strict routing.
    */
  strict?: boolean

  protocol?: "admin" | "user"
}


interface IRouteData {
  hook: string
  route: Array<express.IRoute>
}

export { 
  IRouteData, 
  IServerArgument, 
  IServerArgs, 
  IRouterOptions,
}